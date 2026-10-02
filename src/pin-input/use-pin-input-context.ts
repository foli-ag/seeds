import { createContext, useContext } from "solid-js"
import type { UsePinInputReturn } from "./use-pin-input.js"

export const PinInputProvider = /* @__PURE__ */ createContext<UsePinInputReturn>()

export const usePinInputContext = (): UsePinInputReturn => useContext(PinInputProvider)
