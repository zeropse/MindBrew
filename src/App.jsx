import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import QuotePage from "./pages/QuotePage";
import NotFound from "./pages/NotFound";
import Inspirations from "./pages/Inspirations";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/inspiration" element={<Inspirations />} />
          <Route path="/inspiration/:slug" element={<QuotePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
