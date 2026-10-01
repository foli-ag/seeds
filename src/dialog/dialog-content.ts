import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { show } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { usePresenceContext } from "../utils/presence"
import { useDialogContext } from "./use-dialog-context"

export interface DialogContentProps extends PartProps<"div"> {}

export function DialogContent(props: DialogContentProps): Element {
  const api = useDialogContext()
  const presence = usePresenceContext()
  const merged = mergeProps(
    () => api().getContentProps(),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
