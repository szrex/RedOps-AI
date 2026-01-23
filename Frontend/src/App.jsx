import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AutomatedPentest from "./pages/AutomatedPentest";
import AutoResults from "./pages/AutoResults"; // 🔴 REQUIRED
import LegalDisclaimer from "./pages/LegalDisclaimer";
import Landing from "../src/pages/Landing";
import Documentaion from "../src/pages/Documentation";
import About from "./pages/About";
import NotFound from "./pages/notfound";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auto" element={<AutomatedPentest />} />
        <Route path="/auto/results" element={<AutoResults />} />
        <Route path="/legal" element={<LegalDisclaimer />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/docs" element={<Documentaion />} />
        <Route path="/about" element={<About />} />
        <Route path="/404" element={<NotFound />} />



      </Routes>
    </BrowserRouter>
  );
}
