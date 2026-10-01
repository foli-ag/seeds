import type * as navigationMenu from "@zag-js/navigation-menu"
import { useContext, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { NavigationMenuItemPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuLinkProps
  extends PartProps<"a", Omit<navigationMenu.LinkProps, "value"> & { value?: string | undefined }> {}

/** A link, which takes the value of the item around it unless given one */
export function NavigationMenuLink(props: NavigationMenuLinkProps): Element {
  const [, localProps] = splitProps(props, ["current", "onSelect", "value", "closeOnClick"])
  const item = useContext(NavigationMenuItemPropsProvider)
  const linkProps: navigationMenu.LinkProps = {
    get value() {
      return props.value ?? item?.value ?? ""
    },
    get current() {
      return props.current
    },
    get onSelect() {
      return props.onSelect
    },
    get closeOnClick() {
      return props.closeOnClick
    },
  }
  const api = useNavigationMenuContext()
  return render(
    "a",
    mergeProps(() => api().getLinkProps(linkProps), localProps),
  )
}
