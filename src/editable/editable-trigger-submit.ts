import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableTriggerSubmitProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Commits the value and leaves edit mode */
export function EditableTriggerSubmit<As extends ValidComponent = "button">(
  props: EditableTriggerSubmitProps<As>,
): Element {
  const api = useEditableContext()
  return render(
    "button",
    mergeProps(() => api().getSubmitTriggerProps(), props),
  )
}
