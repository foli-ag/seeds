import { untrack, type Element } from "solid-js"
import { useRadioGroupItemContext, type UseRadioGroupItemContext } from "./use-radio-group-item-context.js"

export interface RadioGroupItemContextProps {
  children: (item: UseRadioGroupItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function RadioGroupItemContext(props: RadioGroupItemContextProps): Element {
  return untrack(() => props.children(useRadioGroupItemContext()))
}
