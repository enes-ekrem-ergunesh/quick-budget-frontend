import { messages } from "@/utils/messages";

export async function getRoot() {
  const response = await fetch("http://localhost:8000/");
  if (!response.ok) {
    throw new Error(messages.ERROR_API_GET_ROOT);
  }
  return response.json();
}

export async function registerUser(body: any) {
  const res = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status == 200) return res;
  else throw new Error(messages.ERROR_API_REGISTER);
}
