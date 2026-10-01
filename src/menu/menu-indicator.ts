import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuIndicatorProps extends PartProps<"div"> {}

/** Marks the open state with `data-state`, for a chevron that turns */
export function MenuIndicator(props: MenuIndicatorProps): Element {
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
