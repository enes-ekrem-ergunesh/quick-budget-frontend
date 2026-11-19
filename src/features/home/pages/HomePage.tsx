import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { NavLink } from "react-router";

export default function HomePage() {
  return (
    <>
      <h1>Home page</h1>
      <LogoutButton/>

    <nav className="flex">
      <NavLink className="mx-auto" to="/" end>
        Home
      </NavLink>
      <NavLink className="mx-auto" to="/entries" end>
        Entries
      </NavLink>
      <NavLink className="mx-auto" to="/categories">Categories</NavLink>
      <NavLink className="mx-auto" to="/account">Account</NavLink>
    </nav>
    </>
  );
}
