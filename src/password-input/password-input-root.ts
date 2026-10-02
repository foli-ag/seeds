import * as passwordInput from "@zag-js/password-input"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePasswordInput, type UsePasswordInputProps } from "./use-password-input.js"
import { PasswordInputProvider } from "./use-password-input-context.js"

export type PasswordInputRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UsePasswordInputProps>

export function PasswordInputRoot<As extends ValidComponent = "div">(props: PasswordInputRootProps<As>): Element {
  const [passwordInputProps, localProps] = splitProps(props, passwordInput.props)
  const api = usePasswordInput(passwordInputProps)
  return provide(PasswordInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
