import type { PropTypes } from "@foliag/zag"
import * as carousel from "@zag-js/carousel"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseCarouselProps extends Optional<carousel.Props, "id"> {}

export type UseCarouselReturn = Accessor<carousel.Api<PropTypes>>

export function useCarousel(props: MaybeAccessor<UseCarouselProps>): UseCarouselReturn {
  return useApi(carousel.machine, carousel.connect, props)
}
