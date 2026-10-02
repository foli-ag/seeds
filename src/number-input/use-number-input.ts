import type { PropTypes } from "@foliag/zag"
import * as numberInput from "@zag-js/number-input"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseNumberInputProps extends Optional<numberInput.Props, "id"> {}

export type UseNumberInputReturn = Accessor<numberInput.Api<PropTypes>>

export function useNumberInput(props: MaybeAccessor<UseNumberInputProps> = {}): UseNumberInputReturn {
  return useApi(numberInput.machine, numberInput.connect, props)
}
