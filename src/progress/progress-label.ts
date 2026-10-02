import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressLabelProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function ProgressLabel<As extends ValidComponent = "span">(props: ProgressLabelProps<As>): Element {
  const api = useProgressContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
