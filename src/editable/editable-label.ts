import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

export function EditableLabel<As extends ValidComponent = "label">(props: EditableLabelProps<As>): Element {
  const api = useEditableContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
