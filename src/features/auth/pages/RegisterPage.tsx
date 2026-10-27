import { useState, useEffect } from "react";

import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    registerUser({ email: email, password: password });
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
