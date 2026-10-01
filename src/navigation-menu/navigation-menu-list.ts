import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuListProps extends PartProps<"div"> {}

/** Holds the items */
export function NavigationMenuList(props: NavigationMenuListProps): Element {
  const api = useNavigationMenuContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
