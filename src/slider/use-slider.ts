import type { PropTypes } from "@foliag/zag"
import * as slider from "@zag-js/slider"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseSliderProps extends Optional<Omit<slider.Props, "dir" | "getRootNode">, "id"> {}

export type UseSliderReturn = Accessor<slider.Api<PropTypes>>

export function useSlider(props: MaybeAccessor<UseSliderProps> = {}): UseSliderReturn {
  return useApi(slider.machine, slider.connect, props)
}
