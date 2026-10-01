import * as avatar from "@zag-js/avatar"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useAvatar, type UseAvatarProps } from "./use-avatar.js"
import { AvatarProvider } from "./use-avatar-context.js"

export type AvatarRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T, UseAvatarProps>

export function AvatarRoot<T extends ValidComponent = "div">(props: AvatarRootProps<T>): Element {
  const [avatarProps, localProps] = splitProps(props, avatar.props)
  const api = useAvatar(avatarProps)
  return provide(AvatarProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
