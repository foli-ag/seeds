import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export type MenuArrowProps<As extends ValidComponent = "div"> = PartProps<As>

/** Points at the trigger from the content, sized through `--arrow-size` */
export function MenuArrow<As extends ValidComponent = "div">(props: MenuArrowProps<As>): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
