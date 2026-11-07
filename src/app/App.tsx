import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/features/home/pages/HomePage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import AlertComponent from "@/features/alert/components/Alert";
import TestPage from "@/features/test/pages/TestPage";
import LoginPage from "@/features/auth/pages/LoginPage";

export default function App() {
  return (
    <>
      <AlertComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
