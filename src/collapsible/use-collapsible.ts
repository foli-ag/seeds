import type { PropTypes } from "@foliag/zag"
import * as collapsible from "@zag-js/collapsible"
import { createMemo, type Accessor } from "solid-js"
import { useUnmounted, type RenderStrategyProps } from "../utils/presence.js"
import { access, type MaybeAccessor, type Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseCollapsibleProps extends Optional<collapsible.Props, "id">, RenderStrategyProps {}

export interface CollapsibleApi extends collapsible.Api<PropTypes> {
  /** Whether the content is out of the DOM, as `lazyMount` and `unmountOnExit` decide */
  unmounted: boolean
}

export type UseCollapsibleReturn = Accessor<CollapsibleApi>

export function useCollapsible(props: MaybeAccessor<UseCollapsibleProps> = {}): UseCollapsibleReturn {
  const api = useApi(collapsible.machine, collapsible.connect, props)
  // The machine runs the exit animation itself and reports the content `visible` until it ends
  const unmounted = useUnmounted(
    () => access(props),
    () => api().visible,
  )
  return createMemo(() => ({ ...api(), unmounted: unmounted() }))
}
