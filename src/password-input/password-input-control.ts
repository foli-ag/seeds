import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export type PasswordInputControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the input and the visibility trigger */
export function PasswordInputControl<As extends ValidComponent = "div">(props: PasswordInputControlProps<As>): Element {
  const api = usePasswordInputContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
