import type { PropTypes } from "@foliag/zag"
import * as popover from "@zag-js/popover"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UsePopoverProps extends Optional<popover.Props, "id"> {}

export type UsePopoverReturn = Accessor<popover.Api<PropTypes>>

export function usePopover(props: MaybeAccessor<UsePopoverProps> = {}): UsePopoverReturn {
  return useApi(popover.machine, popover.connect, props)
}
