import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectValueTextProps
  extends PartProps<
    "span",
    {
      /** Shown while nothing is selected */
      placeholder?: string | undefined
    }
  > {}

/** Shows the labels of the selected items */
export function SelectValueText(props: SelectValueTextProps): Element {
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
