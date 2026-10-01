import * as avatar from "@zag-js/avatar"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useAvatar, type UseAvatarProps } from "./use-avatar.js"
import { AvatarProvider } from "./use-avatar-context.js"

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
