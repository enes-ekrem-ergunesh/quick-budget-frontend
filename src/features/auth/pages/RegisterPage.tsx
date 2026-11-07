import { useNavigate } from "react-router";
import { apiRegister } from "../api";
import { setToken } from "../tokenStorage";
import RegisterForm from "../components/RegisterForm";
import { setAlert } from "@/features/alert/components/Alert";

import type { Token } from "../types";

export default function RegisterPage() {
  let navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target);
    try {
      const token: Token = await (
        await apiRegister({ email: formData.get('email') as string, password: formData.get('password') as string })
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
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
