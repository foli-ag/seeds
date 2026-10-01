import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export interface DialogTitleProps extends PartProps<"h2"> {}

export function DialogTitle(props: DialogTitleProps): Element {
  const api = useDialogContext()
  return render(
    "h2",
    mergeProps(() => api().getTitleProps(), props),
  )
}
