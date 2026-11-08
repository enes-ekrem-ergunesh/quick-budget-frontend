import { Button } from "@/components/ui/button";
import { apiLogout } from "../api";
import { setAlert } from "@/features/alert/components/Alert";
import { useNavigate } from "react-router";
import type { ApiResponseJson } from "@/lib/types";

export function LogoutButton(){
  let navigate = useNavigate();
  async function handleClick(){
    // debugger;
    try {
      const res: ApiResponseJson = await (await apiLogout())?.json()
      navigate("/login")
      setAlert("Logout", res.detail as string, "success")
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Logout Error", type_error.message, "danger")
    }
  }
  return (
    <>
    <Button onClick={handleClick}>Logout</Button>
    </>
  )
}