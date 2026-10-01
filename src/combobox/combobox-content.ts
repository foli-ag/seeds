import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxContentProps extends PartProps<"div"> {}

export function ComboboxContent(props: ComboboxContentProps): Element {
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
