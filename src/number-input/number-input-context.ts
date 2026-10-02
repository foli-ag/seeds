import { untrack, type Element } from "solid-js"
import type { UseNumberInputReturn } from "./use-number-input.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export interface NumberInputContextProps {
  children: (api: UseNumberInputReturn) => Element
}

/** Renders `children` with the number input's API */
export function NumberInputContext(props: NumberInputContextProps): Element {
  return untrack(() => props.children(useNumberInputContext()))
}
