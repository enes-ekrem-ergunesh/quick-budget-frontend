import type { Token } from "./types";
import { messages } from "@/lib/messages";
import { MissingAccessTokenError } from "@/lib/custom-errors";

const LOCAL_STORAGE_TOKEN_KEY = "access_token";

export function getToken() {
  const access_token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (!access_token) {
    throw new MissingAccessTokenError();
  }
  return access_token;
}

export function setToken(token: Token) {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_TOKEN_KEY,
      token.token_type + " " + token.access_token,
    );
  } catch (error) {
    throw new Error(messages.ERROR_SET_TOKEN);
  }
}
