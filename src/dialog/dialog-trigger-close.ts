import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useDialogContext } from "./use-dialog-context"

export interface DialogTriggerCloseProps extends PartProps<"button"> {}

export function DialogTriggerClose(props: DialogTriggerCloseProps): Element {
  const api = useDialogContext()
  return render(
    "button",
    mergeProps(() => api().getCloseTriggerProps(), props),
  )
}
