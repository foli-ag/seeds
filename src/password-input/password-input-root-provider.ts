import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UsePasswordInputReturn } from "./use-password-input.js"
import { PasswordInputProvider } from "./use-password-input-context.js"

export type PasswordInputRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  {
    /** What `usePasswordInput` returned */
    value: UsePasswordInputReturn
  }
>

/** A root for a password input created with `usePasswordInput`, whose API is then available outside it */
export function PasswordInputRootProvider<As extends ValidComponent = "div">(
  props: PasswordInputRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(PasswordInputProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
