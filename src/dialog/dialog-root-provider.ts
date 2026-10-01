import { untrack, type Element } from "solid-js"
import { provide } from "../utils/flow"
import {
  PresenceContext,
  RenderStrategyContext,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from "../utils/presence"
import type { UseDialogReturn } from "./use-dialog"
import { DialogProvider } from "./use-dialog-context"

export interface DialogRootProviderProps extends Omit<UsePresenceProps, "present"> {
  /** What `useDialog` returned */
  value: UseDialogReturn
  children?: Element
}

/** A root for a dialog created with `useDialog`, whose API is then available outside the dialog */
export function DialogRootProvider(props: DialogRootProviderProps): Element {
  const [presenceProps] = splitPresenceProps(props)
  return provideDialog(
    untrack(() => props.value),
    presenceProps,
    () => props.children,
  )
}

export function provideDialog(api: UseDialogReturn, presenceProps: UsePresenceProps, children: () => Element) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  const strategy = () => ({ lazyMount: presenceProps.lazyMount, unmountOnExit: presenceProps.unmountOnExit })
  return provide(DialogProvider, api, () =>
    provide(RenderStrategyContext, strategy, () => provide(PresenceContext, presence, children)),
  )
}
