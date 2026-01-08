import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Landing from "@/pages/Landing";
import Inspirations from "@/pages/Inspirations";
import QuotePage from "@/pages/QuotePage";
import FAQs from "@/pages/FAQs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="inspirations" element={<Inspirations />} />
          <Route path="inspirations/:slug" element={<QuotePage />} />
          <Route path="faqs" element={<FAQs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
