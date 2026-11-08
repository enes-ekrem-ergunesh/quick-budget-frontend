export const messages = {
  ERROR_TOKEN_MISSING: "Token is missing",
  ERROR_SET_TOKEN: "Setting token error",
  ERROR_API_GET_ROOT: "Get root is not ok",
  ERROR_API_REGISTER: "couldn't register"
} as const;

export type ConstantKey = keyof typeof messages;