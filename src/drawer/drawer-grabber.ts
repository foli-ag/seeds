import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerGrabberProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** A handle that drags the drawer, even when its content is not draggable */
export function DrawerGrabber<As extends ValidComponent = "div">(props: DrawerGrabberProps<As>): Element {
  const api = useDrawerContext()
  return render(
    "div",
    mergeProps(() => api().getGrabberProps(), props),
  )
}
