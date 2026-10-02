import { untrack, type Element } from "solid-js"
import type { UseEditableReturn } from "./use-editable.js"
import { useEditableContext } from "./use-editable-context.js"

export interface EditableContextProps {
  children: (api: UseEditableReturn) => Element
}

/** Renders `children` with the editable's API */
export function EditableContext(props: EditableContextProps): Element {
  return untrack(() => props.children(useEditableContext()))
}
