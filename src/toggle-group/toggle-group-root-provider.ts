import { untrack, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseToggleGroupReturn } from "./use-toggle-group.js"
import { ToggleGroupProvider } from "./use-toggle-group-context.js"

export type ToggleGroupRootProviderProps<As extends ValidComponent = "div"> = PartProps<
  As,
  { value: UseToggleGroupReturn }
>

/** A root for a toggle group created with `useToggleGroup` */
export function ToggleGroupRootProvider<As extends ValidComponent = "div">(
  props: ToggleGroupRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(ToggleGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
