import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export type PasswordInputTriggerVisibilityProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Shows or hides the password, then moves focus back to the input */
export function PasswordInputTriggerVisibility<As extends ValidComponent = "button">(
  props: PasswordInputTriggerVisibilityProps<As>,
): Element {
  const api = usePasswordInputContext()
  return render(
    "button",
    mergeProps(() => api().getVisibilityTriggerProps(), props),
  )
}
