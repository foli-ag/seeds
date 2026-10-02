import type { PropTypes } from "@foliag/zag"
import * as hoverCard from "@zag-js/hover-card"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseHoverCardProps extends Optional<hoverCard.Props, "id"> {}

export type UseHoverCardReturn = Accessor<hoverCard.Api<PropTypes>>

export function useHoverCard(props: MaybeAccessor<UseHoverCardProps> = {}): UseHoverCardReturn {
  return useApi(hoverCard.machine, hoverCard.connect, props)
}
