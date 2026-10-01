import type * as radioGroup from "@zag-js/radio-group"
import { createMemo, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import { useRadioGroupContext } from "./use-radio-group-context"
import { RadioGroupItemPropsProvider, RadioGroupItemProvider } from "./use-radio-group-item-context"

export interface RadioGroupItemProps extends PartProps<"label", radioGroup.ItemProps> {}

export function RadioGroupItem(props: RadioGroupItemProps): Element {
  const [itemProps, localProps] = splitProps(props, ["value", "disabled", "invalid"])
  const api = useRadioGroupContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  return provide(RadioGroupItemPropsProvider, itemProps, () =>
    provide(RadioGroupItemProvider, itemState, () =>
      render(
        "label",
        mergeProps(() => api().getItemProps(itemProps), localProps),
      ),
    ),
  )
}
