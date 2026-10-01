import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Placed under the control, and holds the content */
export function ComboboxPositioner<As extends ValidComponent = "div">(props: ComboboxPositionerProps<As>): Element {
  const api = useComboboxContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
