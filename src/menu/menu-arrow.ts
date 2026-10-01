import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuArrowProps extends PartProps<"div"> {}

/** Points at the trigger from the content, sized through `--arrow-size` */
export function MenuArrow(props: MenuArrowProps): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
