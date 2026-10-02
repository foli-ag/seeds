import * as toggle from "@zag-js/toggle"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useToggle, type UseToggleProps } from "./use-toggle.js"
import { ToggleProvider } from "./use-toggle-context.js"

export type ToggleRootProps<As extends ValidComponent = "button"> = PolymorphicProps<As, UseToggleProps>

/** A button that stays pressed until it is pressed again */
export function ToggleRoot<As extends ValidComponent = "button">(props: ToggleRootProps<As>): Element {
  const [toggleProps, localProps] = splitProps(props, toggle.props)
  const api = useToggle(toggleProps)
  return provide(ToggleProvider, api, () =>
    render(
      "button",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
