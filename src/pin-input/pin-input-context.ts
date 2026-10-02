import { untrack, type Element } from "solid-js"
import type { UsePinInputReturn } from "./use-pin-input.js"
import { usePinInputContext } from "./use-pin-input-context.js"

export interface PinInputContextProps {
  children: (api: UsePinInputReturn) => Element
}

/** Renders `children` with the pin input's API */
export function PinInputContext(props: PinInputContextProps): Element {
  return untrack(() => props.children(usePinInputContext()))
}
