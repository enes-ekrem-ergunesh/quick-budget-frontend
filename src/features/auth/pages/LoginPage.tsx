import { useNavigate } from "react-router";
import { apiLogin } from "../api";
import LoginForm from "../components/LoginForm";
import { setToken } from "../tokenStorage";
import type { Token } from "../types";
import { setAlert } from "@/features/alert/components/Alert";

export default function LoginPage() {
  let navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target);
    try {
      const token: Token = await (
        await apiLogin({ username: formData.get('email') as string, password: formData.get('password') as string })
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
        <LoginForm
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
