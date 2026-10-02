import type * as progress from "@zag-js/progress"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressViewProps<As extends ValidComponent = "span"> = PolymorphicProps<As, progress.ViewProps>

/** Shown only while the progress is in `state`: indeterminate, loading or complete */
export function ProgressView<As extends ValidComponent = "span">(props: ProgressViewProps<As>): Element {
  const [viewProps, localProps] = splitProps(props, ["state"])
  const api = useProgressContext()
  return render(
    "span",
    mergeProps(() => api().getViewProps(viewProps), localProps),
  )
}
