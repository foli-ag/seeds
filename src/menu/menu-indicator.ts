import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export type MenuIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Marks the open state with `data-state`, for a chevron that turns */
export function MenuIndicator<As extends ValidComponent = "div">(props: MenuIndicatorProps<As>): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
