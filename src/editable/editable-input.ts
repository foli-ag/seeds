import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** The field the value is typed into, shown in edit mode */
export function EditableInput<As extends ValidComponent = "input">(props: EditableInputProps<As>): Element {
  const api = useEditableContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
