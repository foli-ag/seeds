import { untrack, type Element } from "solid-js"
import { useComboboxItemContext, type UseComboboxItemContext } from "./use-combobox-item-context.js"

export interface ComboboxItemContextProps {
  children: (item: UseComboboxItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function ComboboxItemContext(props: ComboboxItemContextProps): Element {
  return untrack(() => props.children(useComboboxItemContext()))
}
