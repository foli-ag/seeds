import type { PropTypes } from "@foliag/zag"
import * as tabs from "@zag-js/tabs"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseTabsProps extends Optional<Omit<tabs.Props, "dir" | "getRootNode">, "id"> {}

export type UseTabsReturn = Accessor<tabs.Api<PropTypes>>

export function useTabs(props: MaybeAccessor<UseTabsProps> = {}): UseTabsReturn {
  return useApi(tabs.machine, tabs.connect, props)
}
