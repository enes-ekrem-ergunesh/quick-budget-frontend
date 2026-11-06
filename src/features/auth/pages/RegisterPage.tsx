import { useState } from "react";

import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../api";
import { useNavigate } from "react-router";
import type { Token } from "../types";
import { setToken } from "../tokenStorage";
import { setAlert } from "@/features/alert/components/Alert";

export default function RegisterPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const token: Token = await (
        await registerUser({ email: email, password: password })
      )?.json();
      if (token) {
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Registration Error", type_error.message, "danger");
    }
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
