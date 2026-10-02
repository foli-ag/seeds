import { createContext, useContext } from "solid-js"
import type { UsePasswordInputReturn } from "./use-password-input.js"

export const PasswordInputProvider = /* @__PURE__ */ createContext<UsePasswordInputReturn>()

export const usePasswordInputContext = (): UsePasswordInputReturn => useContext(PasswordInputProvider)
