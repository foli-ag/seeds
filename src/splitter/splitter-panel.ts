import type * as splitter from "@zag-js/splitter"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSplitterContext } from "./use-splitter-context.js"

export type SplitterPanelProps<As extends ValidComponent = "div"> = PolymorphicProps<As, splitter.PanelProps>

/** The panel whose `id` is one of the root's `panels`, sized by the splitter */
export function SplitterPanel<As extends ValidComponent = "div">(props: SplitterPanelProps<As>): Element {
  const [panelProps, localProps] = splitProps(props, ["id"])
  const api = useSplitterContext()
  return render(
    "div",
    mergeProps(() => api().getPanelProps(panelProps), localProps),
  )
}
