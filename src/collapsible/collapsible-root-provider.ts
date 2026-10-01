import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import type { UseCollapsibleReturn } from "./use-collapsible"
import { CollapsibleProvider } from "./use-collapsible-context"

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
