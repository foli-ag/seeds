import { createEffect, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export type CheckboxHiddenInputProps<As extends ValidComponent = "input"> = PartProps<As>

/** The native checkbox that carries the value into forms and the state to assistive technology */
export function CheckboxHiddenInput<As extends ValidComponent = "input">(props: CheckboxHiddenInputProps<As>): Element {
  const api = useCheckboxContext()
  let input: HTMLInputElement | undefined
  // zag sets `indeterminate` on changes only, so a checkbox that starts indeterminate would be announced as unchecked
  createEffect(
    () => api().indeterminate,
    (indeterminate) => {
      if (input) input.indeterminate = indeterminate
    },
  )
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props, { ref: (el: HTMLInputElement) => (input = el) }),
  )
}
