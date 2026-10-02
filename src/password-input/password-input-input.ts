import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export type PasswordInputInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** The field the password is typed into, a text field while the password is visible */
export function PasswordInputInput<As extends ValidComponent = "input">(props: PasswordInputInputProps<As>): Element {
  const api = usePasswordInputContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
