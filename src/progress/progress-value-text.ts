import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressValueTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/**
 * Shows `children`, or the value formatted with `formatOptions` and `translations.value`. It is empty while the value
 * is indeterminate, as Ark's is, since the bar's label already says so.
 */
export function ProgressValueText<As extends ValidComponent = "span">(props: ProgressValueTextProps<As>): Element {
  const api = useProgressContext()
  return render(
    "span",
    mergeProps(() => api().getValueTextProps(), props, {
      get children() {
        return props.children || (api().indeterminate ? "" : api().valueAsString)
      },
    }),
  )
}
