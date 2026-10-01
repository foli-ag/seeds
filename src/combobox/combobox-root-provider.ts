import type { CollectionItem } from "@zag-js/collection"
import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseComboboxReturn } from "./use-combobox.js"
import { ComboboxProvider } from "./use-combobox-context.js"

export interface ComboboxRootProviderProps<T extends CollectionItem = any>
  extends PartProps<"div", Omit<UsePresenceProps, "present"> & { value: UseComboboxReturn<T> }> {}

/** A root for a combobox created with `useCombobox` */
export function ComboboxRootProvider<T extends CollectionItem = any>(props: ComboboxRootProviderProps<T>): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [, localProps] = splitProps(rest, ["value"])
  return provideCombobox(
    untrack(() => props.value),
    presenceProps,
    localProps,
  )
}

export function provideCombobox(api: UseComboboxReturn, presenceProps: UsePresenceProps, props: PartProps<"div">) {
  const presence = usePresence(() => ({ ...presenceProps, present: api().open }))
  return provide(ComboboxProvider, api, () =>
    provide(PresenceContext, presence, () =>
      render(
        "div",
        mergeProps(() => api().getRootProps(), props),
      ),
    ),
  )
}
