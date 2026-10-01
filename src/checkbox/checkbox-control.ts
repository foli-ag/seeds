import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export type CheckboxControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The box */
export function CheckboxControl<As extends ValidComponent = "div">(props: CheckboxControlProps<As>): Element {
  const api = useCheckboxContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
