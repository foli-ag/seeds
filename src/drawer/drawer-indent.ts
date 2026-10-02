import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerStackContext } from "./use-drawer-stack-context.js"

export type DrawerIndentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/**
 * The page behind the drawers of the `Drawer.Stack` around it, marked `data-active` while one is open so it can step
 * back, with `--drawer-swipe-progress` and `--drawer-frontmost-height`
 */
export function DrawerIndent<As extends ValidComponent = "div">(props: DrawerIndentProps<As>): Element {
  const api = useDrawerStackContext()
  // zag's anatomy has no indent part, so it is named here the way zag names the others
  return render(
    "div",
    mergeProps({ "data-scope": "drawer", "data-part": "indent" }, () => api().getIndentProps(), props),
  )
}
