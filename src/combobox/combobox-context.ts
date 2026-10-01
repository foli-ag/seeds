import { untrack, type Element } from "solid-js"
import type { UseComboboxReturn } from "./use-combobox.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxContextProps {
  children: (api: UseComboboxReturn) => Element
}

/** Renders `children` with the combobox's API */
export function ComboboxContext(props: ComboboxContextProps): Element {
  return untrack(() => props.children(useComboboxContext()))
}
