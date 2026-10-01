import * as avatar from "@zag-js/avatar"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import { useAvatar, type UseAvatarProps } from "./use-avatar"
import { AvatarProvider } from "./use-avatar-context"

export interface AvatarRootProps extends PartProps<"div", UseAvatarProps> {}

export function AvatarRoot(props: AvatarRootProps): Element {
  const [avatarProps, localProps] = splitProps(props, avatar.props)
  const api = useAvatar(avatarProps)
  return provide(AvatarProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
