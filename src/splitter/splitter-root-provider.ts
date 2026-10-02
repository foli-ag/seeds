import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSplitterReturn } from "./use-splitter.js"
import { SplitterProvider } from "./use-splitter-context.js"

export type SplitterRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseSplitterReturn }
>

/** A root for a splitter created with `useSplitter` */
export function SplitterRootProvider<As extends ValidComponent = "div">(props: SplitterRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(SplitterProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
