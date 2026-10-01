import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"
import { useSelectItemPropsContext } from "./use-select-item-context.js"

export type SelectItemTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function SelectItemText<As extends ValidComponent = "span">(props: SelectItemTextProps<As>): Element {
  const api = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
