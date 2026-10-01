import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogPositionerProps<As extends ValidComponent = "div"> = PartProps<As>

export function DialogPositioner<As extends ValidComponent = "div">(props: DialogPositionerProps<As>): Element {
  const api = useDialogContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
