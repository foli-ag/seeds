import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerStackContext } from "./use-drawer-stack-context.js"

export type DrawerIndentBackgroundProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** What shows behind the indent while it steps back, with the same state as the indent */
export function DrawerIndentBackground<As extends ValidComponent = "div">(
  props: DrawerIndentBackgroundProps<As>,
): Element {
  const api = useDrawerStackContext()
  // zag's anatomy has no indent background part, so it is named here the way zag names the others
  return render(
    "div",
    mergeProps(
      { "data-scope": "drawer", "data-part": "indent-background" },
      () => api().getIndentBackgroundProps(),
      props,
    ),
  )
}
