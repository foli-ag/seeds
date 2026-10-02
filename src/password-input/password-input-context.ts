import { untrack, type Element } from "solid-js"
import type { UsePasswordInputReturn } from "./use-password-input.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export interface PasswordInputContextProps {
  children: (api: UsePasswordInputReturn) => Element
}

/** Renders `children` with the password input's API */
export function PasswordInputContext(props: PasswordInputContextProps): Element {
  return untrack(() => props.children(usePasswordInputContext()))
}
