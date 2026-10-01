import type * as steps from "@zag-js/steps"
import { createMemo, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { StepsItemPropsProvider, StepsItemProvider } from "./use-steps-item-context.js"

export type StepsItemProps<As extends ValidComponent = "div"> = PartProps<As, steps.ItemProps>

/** The step at `index` in the list */
export function StepsItem<As extends ValidComponent = "div">(props: StepsItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["index"])
  const api = useStepsContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  return provide(StepsItemPropsProvider, itemProps, () =>
    provide(StepsItemProvider, itemState, () =>
      render(
        "div",
        mergeProps(() => api().getItemProps(itemProps), localProps),
      ),
    ),
  )
}
