import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the triggers */
export function EditableControl<As extends ValidComponent = "div">(props: EditableControlProps<As>): Element {
  const api = useEditableContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
