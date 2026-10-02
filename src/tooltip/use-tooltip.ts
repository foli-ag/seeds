import type { PropTypes } from "@foliag/zag"
import * as tooltip from "@zag-js/tooltip"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseTooltipProps extends Optional<Omit<tooltip.Props, "getRootNode">, "id"> {}

export type UseTooltipReturn = Accessor<tooltip.Api<PropTypes>>

export function useTooltip(props: MaybeAccessor<UseTooltipProps> = {}): UseTooltipReturn {
  return useApi(tooltip.machine, tooltip.connect, props)
}
