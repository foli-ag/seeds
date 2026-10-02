import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNumberInputContext } from "./use-number-input-context.js"

export type NumberInputScrubberProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Steps the value while the mouse drags sideways from it, under pointer lock */
export function NumberInputScrubber<As extends ValidComponent = "div">(props: NumberInputScrubberProps<As>): Element {
  const api = useNumberInputContext()
  return render(
    "div",
    mergeProps(() => api().getScrubberProps(), props),
  )
}
