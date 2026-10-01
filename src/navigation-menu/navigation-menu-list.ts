import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export type NavigationMenuListProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the items */
export function NavigationMenuList<As extends ValidComponent = "div">(props: NavigationMenuListProps<As>): Element {
  const api = useNavigationMenuContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
