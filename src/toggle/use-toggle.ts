import type { PropTypes } from "@foliag/zag"
import * as toggle from "@zag-js/toggle"
import type { Accessor } from "solid-js"
import type { MaybeAccessor } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseToggleProps extends toggle.Props {}

export type UseToggleReturn = Accessor<toggle.Api<PropTypes>>

export function useToggle(props: MaybeAccessor<UseToggleProps> = {}): UseToggleReturn {
  return useApi(toggle.machine, toggle.connect, props)
}
