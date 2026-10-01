import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuGroupContext } from "./use-menu-group-context.js"

export type MenuGroupLabelProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Names the group around it */
export function MenuGroupLabel<As extends ValidComponent = "div">(props: MenuGroupLabelProps<As>): Element {
  const api = useMenuContext()
  const group = useMenuGroupContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
