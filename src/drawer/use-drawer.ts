import type { PropTypes } from "@foliag/zag"
import * as drawer from "@zag-js/drawer"
import { useContext, type Accessor } from "solid-js"
import { access, type MaybeAccessor, type Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"
import { DrawerStackStoreProvider } from "./use-drawer-stack-context.js"

export interface UseDrawerProps extends Optional<Omit<drawer.Props, "getRootNode">, "id"> {}

export type UseDrawerReturn = Accessor<drawer.Api<PropTypes>>

/** Runs a drawer, which reports to the `Drawer.Stack` around it */
export function useDrawer(props: MaybeAccessor<UseDrawerProps> = {}): UseDrawerReturn {
  const stack = useContext(DrawerStackStoreProvider) ?? undefined
  return useApi(drawer.machine, drawer.connect, () => ({ stack, ...access(props) }))
}
