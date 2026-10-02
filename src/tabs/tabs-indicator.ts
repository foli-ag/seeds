import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTabsContext } from "./use-tabs-context.js"

export type TabsIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/**
 * Follows the selected trigger: positioned absolutely through `--left`, `--top`, `--width` and `--height`, it moves
 * over `--transition-duration` when the selection changes
 */
export function TabsIndicator<As extends ValidComponent = "div">(props: TabsIndicatorProps<As>): Element {
  const api = useTabsContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
