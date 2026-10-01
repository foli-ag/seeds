import type { CollectionItem } from "@zag-js/collection"
import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSelectReturn } from "./use-select.js"
import { SelectProvider } from "./use-select-context.js"

export interface SelectRootProviderProps<T extends CollectionItem = any>
  extends PartProps<"div", Omit<UsePresenceProps, "present"> & { value: UseSelectReturn<T> }> {}

/** A root for a select created with `useSelect` */
export function SelectRootProvider<T extends CollectionItem = any>(props: SelectRootProviderProps<T>): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [, localProps] = splitProps(rest, ["value"])
  return provideSelect(
    untrack(() => props.value),
    presenceProps,
    localProps,
  )
}

export function provideSelect(api: UseSelectReturn, presenceProps: UsePresenceProps, props: PartProps<"div">) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  return provide(SelectProvider, api, () =>
    provide(PresenceContext, presence, () =>
      render(
        "div",
        mergeProps(() => api().getRootProps(), props),
      ),
    ),
  )
}
