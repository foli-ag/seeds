import * as collapsible from "@zag-js/collapsible"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { renderStrategyKeys } from "../utils/presence"
import { splitProps } from "../utils/split-props"
import { useCollapsible, type UseCollapsibleProps } from "./use-collapsible"
import { CollapsibleProvider } from "./use-collapsible-context"

export interface CollapsibleRootProps extends PartProps<"div", UseCollapsibleProps> {}

export function CollapsibleRoot(props: CollapsibleRootProps): Element {
  const [collapsibleProps, localProps] = splitProps(props, [...collapsible.props, ...renderStrategyKeys])
  const api = useCollapsible(collapsibleProps)
  return provide(CollapsibleProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
