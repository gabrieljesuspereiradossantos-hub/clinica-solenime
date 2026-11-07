import './film.css';

const story = document.querySelector('.film-story');

if (story) {
  const portrait = story.querySelector('.film-portrait');
  const video = story.querySelector('video');
  const canvas = story.querySelector('canvas');
  const useFrames = matchMedia('(max-width: 820px), (max-width: 1100px) and (any-pointer: coarse)').matches;
  const context = useFrames ? canvas.getContext('2d') : null;
  // The 8-second clip is exported at 24 fps into twelve 4×4 sheets.
  const sheetCount = 12;
  const framesPerSheet = 16;
  const sheets = new Map();
  let drawnFrame = -1;
  const opening = story.querySelector('.film-opening');
  const header = document.querySelector('.site-header');
  const brand = header.querySelector('.brand');
  const menuToggle = header.querySelector('.menu-toggle');
  const stackedLayout = matchMedia('(max-width: 820px) and (orientation: portrait), (max-width: 540px)');
  const copy = 'h2, .intro-grid p:not(.section-label), .services-copy > p, .rating > p:not(.rating-number), .contact-inner > p, .address > p:not(:has(a))';
  const chapters = [...story.querySelectorAll(':scope > section')].map(section => ({
    section,
    content: section.querySelector(':scope > .wrap'),
    heading: section.querySelector('h2'),
  }));
  let frame = 0;
  let targetTime = 0;

  const clamp = (value) => Math.max(0, Math.min(1, value));

  function showFrame(progress) {
    const index = Math.round(progress * (sheetCount * framesPerSheet - 1));
    const sheetIndex = Math.floor(index / framesPerSheet);
    for (const key of sheets.keys()) {
      if (Math.abs(key - sheetIndex) > 1) sheets.delete(key);
    }
    for (const key of [sheetIndex, sheetIndex + 1, sheetIndex - 1]) {
      if (key < 0 || key >= sheetCount || sheets.has(key)) continue;
      const sheet = new Image();
      sheet.addEventListener('load', schedule, { once: true });
      sheet.src = `/video/frames/sheet-${String(key).padStart(2, '0')}.webp`;
      sheets.set(key, sheet);
    }
    const sheet = sheets.get(sheetIndex);
    if (!sheet.complete || !sheet.naturalWidth || index === drawnFrame) return;
    const cell = index % framesPerSheet;
    const { width, height } = canvas;
    context.drawImage(sheet, (cell % 4) * width, Math.floor(cell / 4) * height,
      width, height, 0, 0, width, height);
    drawnFrame = index;
    portrait.classList.add('has-frame');
  }

  function seek() {
    if (video.readyState < 1 || video.seeking) return;
    if (Math.abs(video.currentTime - targetTime) > 0.005) video.currentTime = targetTime;
  }

  function update() {
    frame = 0;
    const rect = story.getBoundingClientRect();
    const viewport = portrait.clientHeight;
    const dock = clamp(-rect.top / Math.max(1, opening.offsetHeight * 0.86));
    const docked = dock === 1;
    header.classList.toggle('is-brand-docked', docked);
    if (docked) document.body.classList.remove('film-opening-play');
    if (!docked && menuToggle.getAttribute('aria-expanded') === 'true') menuToggle.click();
    if (rect.top >= -12) document.body.classList.add('film-opening-play');
    const brandBox = brand.getBoundingClientRect();
    const centerWidth = Math.min(brandBox.width * 3, rect.width * 0.72, 480);
    const undocked = 1 - dock;
    const distance = Math.max(1, rect.height - viewport);
    const progress = clamp(-rect.top / distance);
    const mobile = stackedLayout.matches;
    const start = viewport * 0.98;
    const exitStart = viewport * (mobile ? 0.91 : 0.69);
    const exitEnd = viewport * (mobile ? 0.59 : 0.13);
    const headerBottom = header.getBoundingClientRect().bottom;
    const safeTop = Math.max(headerBottom + 8, mobile ? viewport * 0.56 : 0);
    const positions = chapters.map(({ section, content, heading }) => ({
      box: section.getBoundingClientRect(),
      contentBottom: content.getBoundingClientRect().bottom,
      headingTop: heading?.getBoundingClientRect().top,
    }));

    portrait.style.setProperty('--zoom', progress * 0.18);
    header.style.setProperty('--brand-x', `${(rect.width / 2 - brandBox.left - brandBox.width / 2) * undocked}px`);
    header.style.setProperty('--brand-y', `${(viewport / 2 - brandBox.top - brandBox.height / 2) * undocked}px`);
    header.style.setProperty('--brand-scale', 1 + (centerWidth / brandBox.width - 1) * undocked);
    header.style.setProperty('--brand-dock', dock);
    for (const [index, chapter] of chapters.entries()) {
      const { box, contentBottom, headingTop } = positions[index];
      const inset = Math.min(box.height, Math.max(0, safeTop - box.top));
      chapter.section.style.setProperty('--content-inset', `${inset}px`);
      chapter.section.style.setProperty('--content-feather', `${Math.min(inset, 40)}px`);
      if (headingTop === undefined) continue;
      const progressOut = clamp((contentBottom - exitEnd) / (exitStart - exitEnd));
      const visibility = progressOut * progressOut * (3 - 2 * progressOut);
      const inView = headingTop <= start && visibility > 0;
      chapter.section.classList.toggle('is-writing', inView);
      chapter.section.style.setProperty('--chapter-visibility', visibility);
    }
    if (context) {
      showFrame(progress);
    } else if (Number.isFinite(video.duration)) {
      targetTime = progress * Math.max(0, video.duration - 1 / 24);
      seek();
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  video.addEventListener('loadedmetadata', schedule);
  video.addEventListener('seeked', seek);
  video.addEventListener('loadeddata', () => portrait.classList.add('has-video'));
  video.addEventListener('error', () => portrait.classList.remove('has-video'));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(story);
  story.classList.add('motion-enabled');
  document.body.classList.add('film-opening-enabled');
  if (!context) {
    video.preload = 'auto';
    video.src = video.dataset.src;
  }
  schedule();

  const segmenter = typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter('pt-BR', { granularity: 'grapheme' })
    : null;

  function prepareWriting(element) {
    const labelSource = element.cloneNode(true);
    labelSource.querySelectorAll('[aria-hidden="true"]').forEach(node => node.remove());
    const label = element.matches('a, button')
      ? labelSource.textContent.replace(/\s+/g, ' ').trim()
      : element.innerText.replace(/\s+/g, ' ').trim();
    const accessible = document.createElement('span');
    accessible.className = 'film-reading-copy';
    accessible.textContent = label;
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.append(...element.childNodes);
    const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const glyphs = [];
    for (const node of nodes) {
      if (node.parentElement.closest('[aria-hidden="true"]') !== visual) continue;
      const fragment = document.createDocumentFragment();
      for (const word of node.data.split(/(\s+)/)) {
        if (!word || /^\s+$/.test(word)) {
          fragment.append(word);
          continue;
        }
        const group = document.createElement('span');
        group.className = 'film-word';
        const letters = segmenter
          ? Array.from(segmenter.segment(word), ({ segment }) => segment)
          : Array.from(word);
        for (const letter of letters) {
          const glyph = document.createElement('span');
          glyph.className = 'film-glyph';
          glyph.textContent = letter;
          glyphs.push(glyph);
          group.append(glyph);
        }
        fragment.append(group);
      }
      node.replaceWith(fragment);
    }
    element.append(accessible, visual);
    return glyphs;
  }

  for (const { section, heading } of chapters) {
    if (!heading) continue;
    const title = prepareWriting(heading);
    const body = [...section.querySelectorAll(copy)].filter(element => element !== heading)
      .flatMap(prepareWriting);
    const actions = [...section.querySelectorAll('.button, .text-link')].flatMap(action => {
      action.classList.add('film-action');
      return prepareWriting(action);
    });
    section.classList.add('film-writing');
    const titleEnd = body.length ? 0.36 : 0.97;
    title.forEach((glyph, index) => {
      glyph.style.setProperty('--letter-at', titleEnd * index / title.length);
    });
    body.forEach((glyph, index) => {
      const bodyEnd = actions.length ? 0.73 : 0.97;
      glyph.style.setProperty('--letter-at', 0.39 + (bodyEnd - 0.39) * index / body.length);
    });
    actions.forEach((glyph, index) => {
      glyph.style.setProperty('--letter-at', 0.78 + 0.19 * index / actions.length);
    });
  }
}
