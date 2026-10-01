import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxContentProps<As extends ValidComponent = "div"> = PartProps<As>

export function ComboboxContent<As extends ValidComponent = "div">(props: ComboboxContentProps<As>): Element {
  const api = useComboboxContext()
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
