import type { PropTypes } from "@foliag/zag"
import * as avatar from "@zag-js/avatar"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseAvatarProps extends Optional<avatar.Props, "id"> {}

export type UseAvatarReturn = Accessor<avatar.Api<PropTypes>>

export function useAvatar(props: MaybeAccessor<UseAvatarProps> = {}): UseAvatarReturn {
  return useApi(avatar.machine, avatar.connect, props)
}
