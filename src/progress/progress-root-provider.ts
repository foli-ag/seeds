import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseProgressReturn } from "./use-progress.js"
import { ProgressProvider } from "./use-progress-context.js"

export type ProgressRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseProgressReturn }
>

/** A root for a progress created with `useProgress` */
export function ProgressRootProvider<As extends ValidComponent = "div">(props: ProgressRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(ProgressProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
