import * as splitter from "@zag-js/splitter"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSplitter, type UseSplitterProps } from "./use-splitter.js"
import { SplitterProvider } from "./use-splitter-context.js"

export type SplitterRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseSplitterProps>

/** Lays out its panels in a row, or in a column when `orientation` is `vertical` */
export function SplitterRoot<As extends ValidComponent = "div">(props: SplitterRootProps<As>): Element {
  const [splitterProps, localProps] = splitProps(props, splitter.props)
  const api = useSplitter(splitterProps)
  return provide(SplitterProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
