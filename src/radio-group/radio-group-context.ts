import { untrack, type Element } from "solid-js"
import type { UseRadioGroupReturn } from "./use-radio-group"
import { useRadioGroupContext } from "./use-radio-group-context"

export interface RadioGroupContextProps {
  children: (api: UseRadioGroupReturn) => Element
}

/** Renders `children` with the radio group's API */
export function RadioGroupContext(props: RadioGroupContextProps): Element {
  return untrack(() => props.children(useRadioGroupContext()))
}
