import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditablePreviewProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Shows the value, or the placeholder when it is empty, outside edit mode */
export function EditablePreview<As extends ValidComponent = "span">(props: EditablePreviewProps<As>): Element {
  const api = useEditableContext()
  return render(
    "span",
    mergeProps(() => api().getPreviewProps(), props),
  )
}
