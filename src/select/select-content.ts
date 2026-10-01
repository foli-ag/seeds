import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function SelectContent<As extends ValidComponent = "div">(props: SelectContentProps<As>): Element {
  const api = useSelectContext()
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
