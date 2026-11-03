import type { Token } from "./types"
import { messages } from "@/utils/messages"

const LOCAL_STORAGE_TOKEN_KEY = "access_token"

export function getToken(){
  const token_str = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  if(!token_str){
    throw new Error(messages.ERROR_TOKEN_MISSING)
  }
  const result: Token = {
    access_token: token_str.split(" ")[0],
    token_type: token_str.split(" ")[1]
  }
  return result
}

export function setToken(token: Token){
  try {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token.token_type + " " + token.access_token)
  } catch (error) {
    throw new Error(messages.ERROR_SET_TOKEN)
  }
}