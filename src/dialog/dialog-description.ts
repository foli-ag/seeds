import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogDescriptionProps<As extends ValidComponent = "div"> = PartProps<As>

export function DialogDescription<As extends ValidComponent = "div">(props: DialogDescriptionProps<As>): Element {
  const api = useDialogContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
