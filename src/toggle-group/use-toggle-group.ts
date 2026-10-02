import type { PropTypes } from "@foliag/zag"
import * as toggleGroup from "@zag-js/toggle-group"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseToggleGroupProps extends Optional<Omit<toggleGroup.Props, "getRootNode">, "id"> {}

export type UseToggleGroupReturn = Accessor<toggleGroup.Api<PropTypes>>

export function useToggleGroup(props: MaybeAccessor<UseToggleGroupProps> = {}): UseToggleGroupReturn {
  return useApi(toggleGroup.machine, toggleGroup.connect, props)
}
