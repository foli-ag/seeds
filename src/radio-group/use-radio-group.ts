import type { PropTypes } from "@foliag/zag"
import * as radioGroup from "@zag-js/radio-group"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseRadioGroupProps extends Optional<radioGroup.Props, "id"> {}

export type UseRadioGroupReturn = Accessor<radioGroup.Api<PropTypes>>

export function useRadioGroup(props: MaybeAccessor<UseRadioGroupProps> = {}): UseRadioGroupReturn {
  return useApi(radioGroup.machine, radioGroup.connect, props)
}
