import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableTriggerEditProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Enters edit mode */
export function EditableTriggerEdit<As extends ValidComponent = "button">(
  props: EditableTriggerEditProps<As>,
): Element {
  const api = useEditableContext()
  return render(
    "button",
    mergeProps(() => api().getEditTriggerProps(), props),
  )
}
