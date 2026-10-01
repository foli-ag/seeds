import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuArrowProps extends PartProps<"div"> {}

/** Points at the open item from the indicator */
export function NavigationMenuArrow(props: NavigationMenuArrowProps): Element {
  const api = useNavigationMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
