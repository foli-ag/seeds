import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export type NavigationMenuArrowProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Points at the open item from the indicator */
export function NavigationMenuArrow<As extends ValidComponent = "div">(props: NavigationMenuArrowProps<As>): Element {
  const api = useNavigationMenuContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
