import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectValueTextProps<As extends ValidComponent = "span"> = PolymorphicProps<
  As,
  {
    /** Shown while nothing is selected */
    placeholder?: string | undefined
  }
>

/** Shows the labels of the selected items */
export function SelectValueText<As extends ValidComponent = "span">(props: SelectValueTextProps<As>): Element {
  const [, localProps] = splitProps(props, ["placeholder"])
  const api = useSelectContext()
  return render(
    "span",
    mergeProps(() => api().getValueTextProps(), localProps, {
      get children() {
        return api().valueAsString || props.placeholder
      },
    }),
  )
}
