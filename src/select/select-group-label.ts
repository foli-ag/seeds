import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectGroupPropsContext } from "./use-select-item-context.js"

export interface SelectGroupLabelProps extends PartProps<"div"> {}

/** Names the group around it */
export function SelectGroupLabel(props: SelectGroupLabelProps): Element {
  const api = useSelectContext()
  const group = useSelectGroupPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
