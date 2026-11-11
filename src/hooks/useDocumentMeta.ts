import { useEffect } from "react";

interface Meta {
  title: string;
  description?: string;
}

/** Atualiza título e meta description por página (SPA). */
export function useDocumentMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description]);
}
