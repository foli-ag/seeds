import type { CollectionItem } from "@zag-js/collection"
import * as combobox from "@zag-js/combobox"
import type { Element } from "solid-js"
import type { PartProps } from "../utils/factory.js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideCombobox } from "./combobox-root-provider.js"
import { useCombobox, type UseComboboxProps } from "./use-combobox.js"

export interface ComboboxRootProps<T extends CollectionItem = any>
  extends PartProps<"div", UseComboboxProps<T> & Omit<UsePresenceProps, "present">> {}

export function ComboboxRoot<T extends CollectionItem = any>(props: ComboboxRootProps<T>): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [comboboxProps, localProps] = splitProps(rest, combobox.props)
  const api = useCombobox(comboboxProps as UseComboboxProps<T>)
  return provideCombobox(api, presenceProps, localProps)
}
