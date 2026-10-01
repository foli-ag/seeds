import type * as radioGroup from "@zag-js/radio-group"
import { createMemo, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"
import { RadioGroupItemPropsProvider, RadioGroupItemProvider } from "./use-radio-group-item-context.js"

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
