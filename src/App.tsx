import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProtocoloSole } from "./pages/ProtocoloSole";
import { Procedimentos } from "./pages/Procedimentos";
import { Sobre } from "./pages/Sobre";
import { Contato } from "./pages/Contato";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocolo-sole" element={<ProtocoloSole />} />
        <Route path="/procedimentos" element={<Procedimentos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
