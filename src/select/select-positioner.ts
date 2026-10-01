import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Placed next to the trigger, and holds the content */
export function SelectPositioner<As extends ValidComponent = "div">(props: SelectPositionerProps<As>): Element {
  const api = useSelectContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
