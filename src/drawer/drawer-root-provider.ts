import { untrack, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import {
  PresenceContext,
  RenderStrategyContext,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from "../utils/presence.js"
import type { UseDrawerReturn } from "./use-drawer.js"
import { DrawerProvider } from "./use-drawer-context.js"

export interface DrawerRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `useDrawer` returned */
  value: UseDrawerReturn
  children?: Element
}

/** A root for a drawer created with `useDrawer`, whose API is then available outside the drawer */
export function DrawerRootProvider(props: DrawerRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return provideDrawer(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function provideDrawer(api: UseDrawerReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  const strategy = () => ({ lazyMount: presenceProps.lazyMount, unmountOnExit: presenceProps.unmountOnExit })
  return provide(DrawerProvider, api, () =>
    provide(RenderStrategyContext, strategy, () => provide(PresenceContext, presence, children)),
  )
}
