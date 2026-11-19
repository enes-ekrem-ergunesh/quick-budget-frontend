import { HttpErrorHandler } from "@/utils/http-error-handler";
import { getToken } from "../auth/tokenStorage";

const API_URL: string = import.meta.env.VITE_API_URL;

export async function apiGetCategory() {
  const access_token = getToken()
  const res = await fetch(`${API_URL}/category`, {
    method: "GET",
    headers: {
      "Authorization": access_token,
    }
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}

export async function apiGetCategoryById(categoryId: string) {
  const access_token = getToken()
  const res = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "GET",
    headers: {
      "Authorization": access_token,
    }
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}

export async function apiPostCategory(body: any) {
  const access_token = getToken()
  const res = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": access_token,
    },
    body: JSON.stringify(body),
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}

export async function apiPatchCategory(body: any) {
  const access_token = getToken()
  const res = await fetch(`${API_URL}/category`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": access_token,
    },
    body: JSON.stringify(body),
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}


export async function apiDeleteCategory(categoryId: string) {
  const access_token = getToken()
  const res = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Authorization": access_token,
    }
  });
  if (res.status == 200) return res;
  else {
    HttpErrorHandler(res)
  };
}