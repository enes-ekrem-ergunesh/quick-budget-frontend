import { HttpErrorHandler } from "@/utils/http-error-handler";
import { getToken } from "../auth/tokenStorage";

const API_URL: string = import.meta.env.VITE_API_URL;

export async function apiGetEntry() {
  const access_token = getToken();
  const res = await fetch(`${API_URL}/entry`, {
    method: "GET",
    headers: {
      Authorization: access_token,
    },
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}

export async function apiGetEntryById(entryId: string) {
  const access_token = getToken();
  const res = await fetch(`${API_URL}/entry/${entryId}`, {
    method: "GET",
    headers: {
      Authorization: access_token,
    },
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}

export async function apiPostEntry(body: any) {
  const access_token = getToken();
  const res = await fetch(`${API_URL}/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    body: JSON.stringify(body),
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}

export async function apiPatchEntry(body: any) {
  const access_token = getToken();
  const res = await fetch(`${API_URL}/entry`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    body: JSON.stringify(body),
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}

export async function apiDeleteEntry(entryId: string) {
  const access_token = getToken();
  const res = await fetch(`${API_URL}/entry/${entryId}`, {
    method: "DELETE",
    headers: {
      Authorization: access_token,
    },
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res);
  }
}
