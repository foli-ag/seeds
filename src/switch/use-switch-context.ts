import { createContext, useContext } from "solid-js"
import type { UseSwitchReturn } from "./use-switch"

export const SwitchProvider = createContext<UseSwitchReturn>()

export const useSwitchContext = (): UseSwitchReturn => useContext(SwitchProvider)
