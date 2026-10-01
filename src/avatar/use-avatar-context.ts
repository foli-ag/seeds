import { createContext, useContext } from "solid-js"
import type { UseAvatarReturn } from "./use-avatar"

export const AvatarProvider = createContext<UseAvatarReturn>()

export const useAvatarContext = (): UseAvatarReturn => useContext(AvatarProvider)
