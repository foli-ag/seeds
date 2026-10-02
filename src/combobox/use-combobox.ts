import type { PropTypes } from "@foliag/zag"
import type { CollectionItem } from "@zag-js/collection"
import * as combobox from "@zag-js/combobox"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseComboboxProps<T extends CollectionItem = any>
  extends Optional<Omit<combobox.Props<T>, "getRootNode">, "id"> {}

export type UseComboboxReturn<T extends CollectionItem = any> = Accessor<combobox.Api<PropTypes, T>>

export function useCombobox<T extends CollectionItem = any>(
  props: MaybeAccessor<UseComboboxProps<T>>,
): UseComboboxReturn<T> {
  return useApi(combobox.machine, combobox.connect, props) as UseComboboxReturn<T>
}
