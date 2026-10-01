import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogBackdropProps<As extends ValidComponent = "div"> = PartProps<As>

export function DialogBackdrop<As extends ValidComponent = "div">(props: DialogBackdropProps<As>): Element {
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
