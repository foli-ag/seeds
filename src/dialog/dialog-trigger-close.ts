import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogTriggerCloseProps<As extends ValidComponent = "button"> = PartProps<As>

export function DialogTriggerClose<As extends ValidComponent = "button">(props: DialogTriggerCloseProps<As>): Element {
  const api = useDialogContext()
  return render(
    "button",
    mergeProps(() => api().getCloseTriggerProps(), props),
  )
}
