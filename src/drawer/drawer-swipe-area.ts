import type * as drawer from "@zag-js/drawer"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerSwipeAreaProps<As extends ValidComponent = "div"> = PolymorphicProps<As, drawer.SwipeAreaProps>

/** An area, usually along a screen edge, where swiping opens the closed drawer */
export function DrawerSwipeArea<As extends ValidComponent = "div">(props: DrawerSwipeAreaProps<As>): Element {
  const [swipeAreaProps, localProps] = splitProps(props, ["disabled", "swipeDirection"])
  const api = useDrawerContext()
  return render(
    "div",
    mergeProps(() => api().getSwipeAreaProps(swipeAreaProps), localProps),
  )
}
