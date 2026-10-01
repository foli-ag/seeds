import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseCollapsibleReturn } from "./use-collapsible.js"
import { CollapsibleProvider } from "./use-collapsible-context.js"

export type CollapsibleRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseCollapsibleReturn }
>

/** A root for a collapsible created with `useCollapsible` */
export function CollapsibleRootProvider<As extends ValidComponent = "div">(
  props: CollapsibleRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(CollapsibleProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
