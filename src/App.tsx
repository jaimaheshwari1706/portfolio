import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Home } from "@/pages/Home";
import { CaseStudyHRMS } from "@/pages/CaseStudyHRMS";
import { CaseStudyJobCopilot } from "@/pages/CaseStudyJobCopilot";
import { CaseStudyAnalytics } from "@/pages/CaseStudyAnalytics";
import { NotFound } from "@/pages/NotFound";
import { useSiteJsonLd } from "@/lib/useSiteJsonLd";

function App() {
  useSiteJsonLd();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-paper focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/enterprise-hrms" element={<CaseStudyHRMS />} />
            <Route path="/work/job-copilot" element={<CaseStudyJobCopilot />} />
            <Route path="/work/analytics-dashboard" element={<CaseStudyAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
