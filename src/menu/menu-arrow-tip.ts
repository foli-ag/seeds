import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export type MenuArrowTipProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The visible part of the arrow */
export function MenuArrowTip<As extends ValidComponent = "div">(props: MenuArrowTipProps<As>): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
