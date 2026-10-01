import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogTitleProps<As extends ValidComponent = "h2"> = PartProps<As>

export function DialogTitle<As extends ValidComponent = "h2">(props: DialogTitleProps<As>): Element {
  const api = useDialogContext()
  return render(
    "h2",
    mergeProps(() => api().getTitleProps(), props),
  )
}
