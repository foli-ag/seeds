import type { PropTypes } from "@foliag/zag"
import * as checkbox from "@zag-js/checkbox"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, "getRootNode">, "id"> {}

export type UseCheckboxReturn = Accessor<checkbox.Api<PropTypes>>

export function useCheckbox(props: MaybeAccessor<UseCheckboxProps> = {}): UseCheckboxReturn {
  return useApi(checkbox.machine, checkbox.connect, props)
}
