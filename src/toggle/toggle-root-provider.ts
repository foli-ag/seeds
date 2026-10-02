import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseToggleReturn } from "./use-toggle.js"
import { ToggleProvider } from "./use-toggle-context.js"

export type ToggleRootProviderProps<As extends ValidComponent = "button"> = PolymorphicProps<
  As,
  { value: UseToggleReturn }
>

/** A root for a toggle created with `useToggle` */
export function ToggleRootProvider<As extends ValidComponent = "button">(props: ToggleRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(ToggleProvider, api, () =>
    render(
      "button",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
