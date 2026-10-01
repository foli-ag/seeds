import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { show } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { usePresence, useRenderStrategyContext } from "../utils/presence"
import { useDialogContext } from "./use-dialog-context"

export interface DialogBackdropProps extends PartProps<"div"> {}

export function DialogBackdrop(props: DialogBackdropProps): Element {
  const api = useDialogContext()
  // The backdrop animates on its own, so it runs a presence of its own
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().open }))
  const merged = mergeProps(
    () => api().getBackdropProps(),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
