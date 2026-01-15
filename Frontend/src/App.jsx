import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AutomatedPentest from "./pages/AutomatedPentest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auto" element={<AutomatedPentest />} />
      </Routes>
    </BrowserRouter>
  );
}
