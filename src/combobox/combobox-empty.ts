import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxEmptyProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Shown while the collection has no items, such as when nothing matches the input */
export function ComboboxEmpty<As extends ValidComponent = "div">(props: ComboboxEmptyProps<As>): Element {
  const api = useComboboxContext()
  // zag's anatomy has no empty part, so it is named here the way zag names the others
  const merged = mergeProps({ "data-scope": "combobox", "data-part": "empty" }, props, { role: "presentation" })
  return show(
    () => api().collection.size === 0,
    () => render("div", merged),
  )
}
