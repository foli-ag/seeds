import type { PropTypes } from "@foliag/zag"
import * as accordion from "@zag-js/accordion"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseAccordionProps extends Optional<Omit<accordion.Props, "getRootNode">, "id"> {}

export type UseAccordionReturn = Accessor<accordion.Api<PropTypes>>

export function useAccordion(props: MaybeAccessor<UseAccordionProps> = {}): UseAccordionReturn {
  return useApi(accordion.machine, accordion.connect, props)
}
