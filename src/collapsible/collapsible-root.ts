import * as collapsible from "@zag-js/collapsible"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { renderStrategyKeys } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useCollapsible, type UseCollapsibleProps } from "./use-collapsible.js"
import { CollapsibleProvider } from "./use-collapsible-context.js"

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
