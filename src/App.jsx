import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/layout";
import { Spinner } from "@/components/ui/spinner";

const Landing = lazy(() => import("@/pages/Landing"));
const Inspirations = lazy(() => import("@/pages/Inspirations"));
const QuotePage = lazy(() => import("@/pages/QuotePage"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <Spinner className="size-8 text-primary" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="inspirations" element={<Inspirations />} />
            <Route path="inspirations/:slug" element={<QuotePage />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
