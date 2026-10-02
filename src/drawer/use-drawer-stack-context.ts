import type { PropTypes } from "@foliag/zag"
import type * as drawer from "@zag-js/drawer"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseDrawerStackContext = Accessor<drawer.DrawerStackApi<PropTypes>>

export const DrawerStackProvider = /* @__PURE__ */ createContext<UseDrawerStackContext>()

/** The API of the `Drawer.Stack` around the caller */
export const useDrawerStackContext = (): UseDrawerStackContext => useContext(DrawerStackProvider)

/** The stack that the drawers inside a `Drawer.Stack` report their state to */
export const DrawerStackStoreProvider = /* @__PURE__ */ createContext<drawer.DrawerStack | null>(null)
