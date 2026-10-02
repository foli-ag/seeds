import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerGrabberIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The bar drawn inside the grabber */
export function DrawerGrabberIndicator<As extends ValidComponent = "div">(
  props: DrawerGrabberIndicatorProps<As>,
): Element {
  const api = useDrawerContext()
  return render(
    "div",
    mergeProps(() => api().getGrabberIndicatorProps(), props),
  )
}
