import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCollapsibleContext } from "./use-collapsible-context.js"

export interface CollapsibleContentProps extends PartProps<"div"> {}

export function CollapsibleContent(props: CollapsibleContentProps): Element {
  const api = useCollapsibleContext()
  const merged = mergeProps(() => api().getContentProps(), props)
  return show(
    () => !api().unmounted,
    () => render("div", merged),
  )
}
