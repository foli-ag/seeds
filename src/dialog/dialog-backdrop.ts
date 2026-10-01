import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { useDialogContext } from "./use-dialog-context.js"

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
