import type { PropTypes } from "@foliag/zag"
import * as editable from "@zag-js/editable"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseEditableProps extends Optional<editable.Props, "id"> {}

export type UseEditableReturn = Accessor<editable.Api<PropTypes>>

export function useEditable(props: MaybeAccessor<UseEditableProps> = {}): UseEditableReturn {
  return useApi(editable.machine, editable.connect, props)
}
