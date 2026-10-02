import type { PropTypes } from "@foliag/zag"
import * as pinInput from "@zag-js/pin-input"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UsePinInputProps extends Optional<pinInput.Props, "id"> {}

export type UsePinInputReturn = Accessor<pinInput.Api<PropTypes>>

export function usePinInput(props: MaybeAccessor<UsePinInputProps> = {}): UsePinInputReturn {
  return useApi(pinInput.machine, pinInput.connect, props)
}
