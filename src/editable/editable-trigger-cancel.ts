import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useEditableContext } from "./use-editable-context.js"

export type EditableTriggerCancelProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Reverts the value and leaves edit mode */
export function EditableTriggerCancel<As extends ValidComponent = "button">(
  props: EditableTriggerCancelProps<As>,
): Element {
  const api = useEditableContext()
  return render(
    "button",
    mergeProps(() => api().getCancelTriggerProps(), props),
  )
}
