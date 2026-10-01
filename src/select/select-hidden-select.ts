import { createComponent, For, type Accessor, type Component, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectHiddenSelectProps extends PartProps<"select"> {}

/** The native select that carries the value into forms, with an option per item */
export function SelectHiddenSelect(props: SelectHiddenSelectProps): Element {
  const api = useSelectContext()
  // The options carry the selection. Setting `value` on a multiple select to several values selects none of them.
  const selectProps = () => {
    const { value, ...rest } = api().getHiddenSelectProps()
    return rest
  }
  const empty = show(
    () => api().value.length === 0,
    () => render("option", { value: "" }),
  )
  const options = createComponent(ForIndexed, {
    get each() {
      return api().collection.items
    },
    keyed: false,
    children: (item) => {
      const value = () => api().collection.getItemValue(item()) ?? ""
      return render("option", {
        get value() {
          return value()
        },
        get disabled() {
          return api().collection.getItemDisabled(item())
        },
        get selected() {
          return api().value.includes(value())
        },
        get children() {
          return api().collection.stringifyItem(item())
        },
      })
    },
  })
  return render("select", mergeProps(selectProps, props, { children: [empty, options] }))
}

// The non-keyed overload, which `createComponent` cannot pick on its own
const ForIndexed = For as Component<{
  each: readonly unknown[]
  keyed: false
  children: (item: Accessor<unknown>) => Element
}>
