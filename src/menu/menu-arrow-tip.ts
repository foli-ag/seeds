import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuArrowTipProps extends PartProps<"div"> {}

/** The visible part of the arrow */
export function MenuArrowTip(props: MenuArrowTipProps): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
