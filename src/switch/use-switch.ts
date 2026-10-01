import type { PropTypes } from "@foliag/zag"
import * as zagSwitch from "@zag-js/switch"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types"
import { useApi } from "../utils/use-api"

export interface UseSwitchProps extends Optional<zagSwitch.Props, "id"> {}

export type UseSwitchReturn = Accessor<zagSwitch.Api<PropTypes>>

export function useSwitch(props: MaybeAccessor<UseSwitchProps> = {}): UseSwitchReturn {
  return useApi(zagSwitch.machine, zagSwitch.connect, props)
}
