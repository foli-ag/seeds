import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export interface DialogDescriptionProps extends PartProps<"div"> {}

export function DialogDescription(props: DialogDescriptionProps): Element {
  const api = useDialogContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
