import { onSettled, untrack, useContext, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import type { UseMenuReturn } from "./use-menu.js"
import { MenuParentProvider, MenuProvider, MenuTriggerItemProvider } from "./use-menu-context.js"

export interface MenuRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `useMenu` returned */
  value: UseMenuReturn
  children?: Element
}

/** A root for a menu created with `useMenu`, whose API is then available outside the menu */
export function MenuRootProvider(props: MenuRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return provideMenu(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function provideMenu(menu: UseMenuReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const { api, service } = menu
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))

  // Inside another menu, this one is a submenu that the parent opens from one of its items
  const parent = useContext(MenuParentProvider)
  if (parent) {
    onSettled(() => {
      parent.api().setChild(service)
      api().setParent(parent.service)
    })
  }
  const triggerItemProps = () => parent?.api().getTriggerItemProps(api()) ?? {}

  return provide(MenuParentProvider, menu, () =>
    provide(MenuTriggerItemProvider, parent ? triggerItemProps : null, () =>
      provide(MenuProvider, api, () => provide(PresenceContext, presence, children)),
    ),
  )
}
