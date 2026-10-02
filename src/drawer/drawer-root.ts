import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { provideDrawer } from "./drawer-root-provider.js"
import { useDrawer, type UseDrawerProps } from "./use-drawer.js"

export interface DrawerRootProps extends UseDrawerProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

export function DrawerRoot(props: DrawerRootProps): Element {
  const [presenceProps, drawerProps] = splitPresenceProps(props)
  const api = useDrawer(omit(drawerProps, "children"))
  return provideDrawer(api, presenceProps, () => props.children)
}
