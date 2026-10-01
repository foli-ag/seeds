import { untrack, type Element } from "solid-js"
import { useSelectItemContext, type UseSelectItemContext } from "./use-select-item-context.js"

export interface SelectItemContextProps {
  children: (item: UseSelectItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function SelectItemContext(props: SelectItemContextProps): Element {
  return untrack(() => props.children(useSelectItemContext()))
}
