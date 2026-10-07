import type { PropTypes } from "@foliag/zag"
import * as splitter from "@zag-js/splitter"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseSplitterProps extends Optional<Omit<splitter.Props, "dir" | "getRootNode">, "id"> {}

export type UseSplitterReturn = Accessor<splitter.Api<PropTypes>>

export function useSplitter(props: MaybeAccessor<UseSplitterProps>): UseSplitterReturn {
  return useApi(splitter.machine, splitter.connect, props)
}
