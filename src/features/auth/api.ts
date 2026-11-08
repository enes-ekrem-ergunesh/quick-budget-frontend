import { HttpErrorHandler } from "@/utils/http-error-handler";
import type { LoginRequest } from "./types";
import { getToken } from "./tokenStorage";

const API_URL: string = import.meta.env.VITE_API_URL;

export async function apiRegister(body: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}

export async function apiLogin(loginRequest: LoginRequest) {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: loginRequest.username,
      password: loginRequest.password,
    }),
  });
  if (res.status == 200) return res;
  else HttpErrorHandler(res);
}

export async function apiLogout() {
  const access_token = getToken()
  const res = await fetch("http://localhost:8000/auth/logout", {
    method: "POST",
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: access_token,
    },
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}