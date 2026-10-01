import { createUniqueId, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useComboboxContext } from "./use-combobox-context.js"
import { ComboboxGroupPropsProvider } from "./use-combobox-item-context.js"

export interface ComboboxGroupProps extends PartProps<"div", { id?: string | undefined }> {}

/** Groups items under a `Group.Label` */
export function ComboboxGroup(props: ComboboxGroupProps): Element {
  const [, localProps] = splitProps(props, ["id"])
  const id = createUniqueId()
  const groupProps = {
    get id() {
      return props.id ?? id
    },
  }
  const api = useComboboxContext()
  return provide(ComboboxGroupPropsProvider, groupProps, () =>
    render(
      "div",
      mergeProps(() => api().getItemGroupProps(groupProps), localProps),
    ),
  )
}
