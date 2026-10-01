import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useDialogContext } from "./use-dialog-context"

export interface DialogDescriptionProps extends PartProps<"div"> {}

export function DialogDescription(props: DialogDescriptionProps): Element {
  const api = useDialogContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
