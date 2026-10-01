import * as toggleGroup from "@zag-js/toggle-group"
import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useToggleGroup, type UseToggleGroupProps } from "./use-toggle-group.js"
import { ToggleGroupProvider } from "./use-toggle-group-context.js"

export type ToggleGroupRootProps<As extends ValidComponent = "div"> = PartProps<As, UseToggleGroupProps>

export function ToggleGroupRoot<As extends ValidComponent = "div">(props: ToggleGroupRootProps<As>): Element {
  const [toggleGroupProps, localProps] = splitProps(props, toggleGroup.props)
  const api = useToggleGroup(toggleGroupProps)
  return provide(ToggleGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
