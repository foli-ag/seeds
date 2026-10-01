import type * as steps from "@zag-js/steps"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As, steps.ItemProps>

/** Shown while the step at `index` is current */
export function StepsContent<As extends ValidComponent = "div">(props: StepsContentProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["index"])
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getContentProps(itemProps), localProps),
  )
}
