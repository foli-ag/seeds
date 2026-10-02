import * as progress from "@zag-js/progress"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useProgress, type UseProgressProps } from "./use-progress.js"
import { ProgressProvider } from "./use-progress-context.js"

export type ProgressRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseProgressProps>

export function ProgressRoot<As extends ValidComponent = "div">(props: ProgressRootProps<As>): Element {
  const [progressProps, localProps] = splitProps(props, progress.props)
  const api = useProgress(progressProps)
  return provide(ProgressProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
