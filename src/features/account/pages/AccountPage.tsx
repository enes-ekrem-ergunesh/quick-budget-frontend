import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { NavLink } from "react-router";

export default function AccountPage(){
  return(
    <>
      <NavLink className="absolute" to="/">{'< back'}</NavLink>
      <h1>Account page</h1>
      <LogoutButton/>
    </>
  )
}

