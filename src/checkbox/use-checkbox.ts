import type { PropTypes } from "@foliag/zag"
import * as checkbox from "@zag-js/checkbox"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types"
import { useApi } from "../utils/use-api"

export interface UseCheckboxProps extends Optional<checkbox.Props, "id"> {}

export type UseCheckboxReturn = Accessor<checkbox.Api<PropTypes>>

export function useCheckbox(props: MaybeAccessor<UseCheckboxProps> = {}): UseCheckboxReturn {
  return useApi(checkbox.machine, checkbox.connect, props)
}
