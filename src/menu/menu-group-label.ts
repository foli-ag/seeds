import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuGroupContext } from "./use-menu-group-context.js"

export interface MenuGroupLabelProps extends PartProps<"div"> {}

/** Names the group around it */
export function MenuGroupLabel(props: MenuGroupLabelProps): Element {
  const api = useMenuContext()
  const group = useMenuGroupContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupLabelProps({ htmlFor: group.id }), props),
  )
}
