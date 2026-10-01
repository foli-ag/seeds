import type { CollectionItem } from "@zag-js/collection"
import * as combobox from "@zag-js/combobox"
import type { Element } from "solid-js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideCombobox } from "./combobox-root-provider.js"
import { useCombobox, type UseComboboxProps } from "./use-combobox.js"

export type ComboboxRootProps<T extends CollectionItem = any, As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  UseComboboxProps<T> & Omit<UsePresenceProps, "present">
>

export function ComboboxRoot<T extends CollectionItem = any, As extends ValidComponent = "div">(
  props: ComboboxRootProps<T, As>,
): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [comboboxProps, localProps] = splitProps(rest, combobox.props)
  const api = useCombobox(comboboxProps as UseComboboxProps<T>)
  return provideCombobox(api, presenceProps, localProps)
}
