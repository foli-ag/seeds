import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { useComboboxItemPropsContext } from "./use-combobox-item-context.js"

export type ComboboxItemIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Shown while the item around it is selected */
export function ComboboxItemIndicator<As extends ValidComponent = "div">(
  props: ComboboxItemIndicatorProps<As>,
): Element {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
