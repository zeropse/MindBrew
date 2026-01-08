import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Landing from "@/pages/Landing";
import FAQs from "@/pages/FAQs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="faqs" element={<FAQs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
