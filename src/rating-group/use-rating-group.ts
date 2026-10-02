import type { PropTypes } from "@foliag/zag"
import * as ratingGroup from "@zag-js/rating-group"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseRatingGroupProps extends Optional<Omit<ratingGroup.Props, "getRootNode">, "id"> {}

export type UseRatingGroupReturn = Accessor<ratingGroup.Api<PropTypes>>

export function useRatingGroup(props: MaybeAccessor<UseRatingGroupProps> = {}): UseRatingGroupReturn {
  return useApi(ratingGroup.machine, ratingGroup.connect, props)
}
