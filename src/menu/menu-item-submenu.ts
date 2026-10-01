import { useContext, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { MenuTriggerItemProvider } from "./use-menu-context.js"
import { MenuItemPropsProvider } from "./use-menu-item-context.js"

export type MenuItemSubmenuProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The item of the parent menu that opens the submenu around it */
export function MenuItemSubmenu<As extends ValidComponent = "div">(props: MenuItemSubmenuProps<As>): Element {
  const triggerItemProps = useContext(MenuTriggerItemProvider)
  const merged = mergeProps(() => triggerItemProps?.() ?? {}, props)
  // Item.Text and Item.Indicator inside it ask the parent menu about this item
  const itemProps = {
    get value() {
      return (triggerItemProps?.() as Record<string, string> | undefined)?.["data-value"] ?? ""
    },
  }
  return provide(MenuItemPropsProvider, itemProps, () => render("div", merged))
}
