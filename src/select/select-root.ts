import type { CollectionItem } from "@zag-js/collection"
import * as select from "@zag-js/select"
import type { Element } from "solid-js"
import type { PartProps } from "../utils/factory.js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideSelect } from "./select-root-provider.js"
import { useSelect, type UseSelectProps } from "./use-select.js"

export interface SelectRootProps<T extends CollectionItem = any>
  extends PartProps<"div", UseSelectProps<T> & Omit<UsePresenceProps, "present">> {}

export function SelectRoot<T extends CollectionItem = any>(props: SelectRootProps<T>): Element {
  const [presenceProps, rest] = splitPresenceProps(props)
  const [selectProps, localProps] = splitProps(rest, select.props)
  const api = useSelect(selectProps as UseSelectProps<T>)
  return provideSelect(api, presenceProps, localProps)
}
