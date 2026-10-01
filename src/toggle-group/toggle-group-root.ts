import * as toggleGroup from "@zag-js/toggle-group"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useToggleGroup, type UseToggleGroupProps } from "./use-toggle-group.js"
import { ToggleGroupProvider } from "./use-toggle-group-context.js"

export interface ToggleGroupRootProps extends PartProps<"div", UseToggleGroupProps> {}

export function ToggleGroupRoot(props: ToggleGroupRootProps): Element {
  const [toggleGroupProps, localProps] = splitProps(props, toggleGroup.props)
  const api = useToggleGroup(toggleGroupProps)
  return provide(ToggleGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
