import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AutomatedPentest from "./pages/AutomatedPentest";
import AutoResults from "./pages/AutoResults"; // 🔴 REQUIRED
import LegalDisclaimer from "./pages/LegalDisclaimer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auto" element={<AutomatedPentest />} />
        <Route path="/auto/results" element={<AutoResults />} />
        <Route path="/scopes" element={<LegalDisclaimer />} />
      </Routes>
    </BrowserRouter>
  );
}
