import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseCollapsibleReturn } from "./use-collapsible.js"
import { CollapsibleProvider } from "./use-collapsible-context.js"

export interface CollapsibleRootProviderProps extends PartProps<"div", { value: UseCollapsibleReturn }> {}

/** A root for a collapsible created with `useCollapsible` */
export function CollapsibleRootProvider(props: CollapsibleRootProviderProps): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(CollapsibleProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
