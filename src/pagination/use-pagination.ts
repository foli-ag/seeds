import type { PropTypes } from "@foliag/zag"
import * as pagination from "@zag-js/pagination"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UsePaginationProps extends Optional<pagination.Props, "id"> {}

export type UsePaginationReturn = Accessor<pagination.Api<PropTypes>>

export function usePagination(props: MaybeAccessor<UsePaginationProps> = {}): UsePaginationReturn {
  return useApi(pagination.machine, pagination.connect, props)
}
