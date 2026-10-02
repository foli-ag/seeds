import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export type PasswordInputLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

export function PasswordInputLabel<As extends ValidComponent = "label">(props: PasswordInputLabelProps<As>): Element {
  const api = usePasswordInputContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
