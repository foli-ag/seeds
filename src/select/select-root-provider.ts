import type { CollectionItem } from "@zag-js/collection"
import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseSelectReturn } from "./use-select.js"
import { SelectProvider } from "./use-select-context.js"

export type SelectRootProviderProps<
  T extends CollectionItem = any,
  As extends ValidComponent = "div",
> = PolymorphicProps<As, Omit<UsePresenceProps, "present"> & { value: UseSelectReturn<T> }>

/** A root for a select created with `useSelect` */
export function SelectRootProvider<T extends CollectionItem = any, As extends ValidComponent = "div">(
  props: SelectRootProviderProps<T, As>,
): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [, localProps] = splitProps(rest, ["value"])
  return provideSelect(
    untrack(() => props.value),
    presenceProps,
    localProps,
  )
}

export function provideSelect(api: UseSelectReturn, presenceProps: UsePresenceProps, props: PolymorphicProps<"div">) {
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
