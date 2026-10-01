import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export interface CheckboxIndicatorProps
  extends PartProps<
    "div",
    {
      /** Shows the indicator while the checkbox is indeterminate instead of while it is checked */
      indeterminate?: boolean | undefined
    }
  > {}

/** The check mark, hidden while the checkbox is not in the state it marks */
export function CheckboxIndicator(props: CheckboxIndicatorProps): Element {
  const [indicatorProps, localProps] = splitProps(props, ["indeterminate"])
  const api = useCheckboxContext()
  return render(
    "div",
    mergeProps(
      () => api().getIndicatorProps(),
      localProps,
      () => ({ hidden: !(indicatorProps.indeterminate ? api().indeterminate : api().checked) }),
    ),
  )
}
