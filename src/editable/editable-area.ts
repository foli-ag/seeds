import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableAreaProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the preview and the input */
export function EditableArea<As extends ValidComponent = "div">(props: EditableAreaProps<As>): Element {
  const api = useEditableContext()
  return render(
    "div",
    mergeProps(() => api().getAreaProps(), props),
  )
}
