import { untrack, type Element } from "solid-js"
import type { UseCheckboxReturn } from "./use-checkbox"
import { useCheckboxContext } from "./use-checkbox-context"

export interface CheckboxContextProps {
  children: (api: UseCheckboxReturn) => Element
}

/** Renders `children` with the checkbox's API */
export function CheckboxContext(props: CheckboxContextProps): Element {
  return untrack(() => props.children(useCheckboxContext()))
}
