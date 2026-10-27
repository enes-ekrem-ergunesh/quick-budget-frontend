import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/features/home/pages/HomePage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
