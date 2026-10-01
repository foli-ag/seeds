import { untrack, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseAvatarReturn } from "./use-avatar.js"
import { AvatarProvider } from "./use-avatar-context.js"

export type AvatarRootProviderProps<As extends ValidComponent = "div"> = PartProps<As, { value: UseAvatarReturn }>

/** A root for an avatar created with `useAvatar` */
export function AvatarRootProvider<As extends ValidComponent = "div">(props: AvatarRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(AvatarProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
