import type { PropTypes } from "@foliag/zag"
import * as zagSwitch from "@zag-js/switch"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, "getRootNode">, "id"> {}

export type UseSwitchReturn = Accessor<zagSwitch.Api<PropTypes>>

export function useSwitch(props: MaybeAccessor<UseSwitchProps> = {}): UseSwitchReturn {
  return useApi(zagSwitch.machine, zagSwitch.connect, props)
}
