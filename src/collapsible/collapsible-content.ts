import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCollapsibleContext } from "./use-collapsible-context.js"

export type CollapsibleContentProps<As extends ValidComponent = "div"> = PartProps<As>

export function CollapsibleContent<As extends ValidComponent = "div">(props: CollapsibleContentProps<As>): Element {
  const api = useCollapsibleContext()
  const merged = mergeProps(() => api().getContentProps(), props)
  return show(
    () => !api().unmounted,
    () => render("div", merged),
  )
}
