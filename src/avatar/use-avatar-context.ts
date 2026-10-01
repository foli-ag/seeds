import { createContext, useContext } from "solid-js"
import type { UseAvatarReturn } from "./use-avatar.js"

export const AvatarProvider = /* @__PURE__ */ createContext<UseAvatarReturn>()

export const useAvatarContext = (): UseAvatarReturn => useContext(AvatarProvider)
