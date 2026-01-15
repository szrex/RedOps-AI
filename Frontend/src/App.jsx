import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AutomatedPentest from "./pages/AutomatedPentest";
import AutoResults from "./pages/AutoResults"; // 🔴 REQUIRED

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auto" element={<AutomatedPentest />} />
        <Route path="/auto/results" element={<AutoResults />} />
      </Routes>
    </BrowserRouter>
  );
}
