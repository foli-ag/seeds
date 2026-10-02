import type { PropTypes } from "@foliag/zag"
import * as angleSlider from "@zag-js/angle-slider"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseAngleSliderProps extends Optional<angleSlider.Props, "id"> {}

export type UseAngleSliderReturn = Accessor<angleSlider.Api<PropTypes>>

export function useAngleSlider(props: MaybeAccessor<UseAngleSliderProps> = {}): UseAngleSliderReturn {
  return useApi(angleSlider.machine, angleSlider.connect, props)
}
