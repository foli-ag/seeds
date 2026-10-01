import { createUniqueId, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSelectContext } from "./use-select-context.js"
import { SelectGroupPropsProvider } from "./use-select-item-context.js"

export type SelectGroupProps<As extends ValidComponent = "div"> = PolymorphicProps<As, { id?: string | undefined }>

/** Groups items under a `Group.Label` */
export function SelectGroup<As extends ValidComponent = "div">(props: SelectGroupProps<As>): Element {
  const [, localProps] = splitProps(props, ["id"])
  const id = createUniqueId()
  const groupProps = {
    get id() {
      return props.id ?? id
    },
  }
  const api = useSelectContext()
  return provide(SelectGroupPropsProvider, groupProps, () =>
    render(
      "div",
      mergeProps(() => api().getItemGroupProps(groupProps), localProps),
    ),
  )
}
