import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectGroupPropsContext } from "./use-select-item-context.js"

export type SelectGroupLabelProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Names the group around it */
export function SelectGroupLabel<As extends ValidComponent = "div">(props: SelectGroupLabelProps<As>): Element {
  const api = useSelectContext()
  const group = useSelectGroupPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
