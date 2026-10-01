import { createUniqueId, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { MenuGroupProvider, type MenuGroupContext } from "./use-menu-group-context.js"

export type MenuGroupProps<As extends ValidComponent = "div"> = PartProps<As, { id?: string | undefined }>

/** Groups items under a `Group.Label` */
export function MenuGroup<As extends ValidComponent = "div">(props: MenuGroupProps<As>): Element {
  const [, localProps] = splitProps(props, ["id"])
  const id = createUniqueId()
  const group: MenuGroupContext = {
    get id() {
      return props.id ?? id
    },
  }
  return provideGroup(group, localProps)
}

export function provideGroup(group: MenuGroupContext, props: PartProps<"div">): Element {
  const api = useMenuContext()
  return provide(MenuGroupProvider, group, () =>
    render(
      "div",
      mergeProps(() => api().getItemGroupProps(group), props),
    ),
  )
}
