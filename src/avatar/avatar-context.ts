import { untrack, type Element } from "solid-js"
import type { UseAvatarReturn } from "./use-avatar"
import { useAvatarContext } from "./use-avatar-context"

export interface AvatarContextProps {
  children: (api: UseAvatarReturn) => Element
}

/** Renders `children` with the avatar's API */
export function AvatarContext(props: AvatarContextProps): Element {
  return untrack(() => props.children(useAvatarContext()))
}
