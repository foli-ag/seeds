import type { PropTypes } from "@foliag/zag"
import type { CollectionItem } from "@zag-js/collection"
import * as select from "@zag-js/select"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseSelectProps<T extends CollectionItem = any>
  extends Optional<Omit<select.Props<T>, "getRootNode">, "id"> {}

export type UseSelectReturn<T extends CollectionItem = any> = Accessor<select.Api<PropTypes, T>>

export function useSelect<T extends CollectionItem = any>(props: MaybeAccessor<UseSelectProps<T>>): UseSelectReturn<T> {
  return useApi(select.machine, select.connect, props) as UseSelectReturn<T>
}
