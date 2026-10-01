import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useDialogContext } from "./use-dialog-context"

export interface DialogTitleProps extends PartProps<"h2"> {}

export function DialogTitle(props: DialogTitleProps): Element {
  const api = useDialogContext()
  return render(
    "h2",
    mergeProps(() => api().getTitleProps(), props),
  )
}
