import { createMemo, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useToggleContext } from "./use-toggle-context.js"

export type ToggleIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  {
    /** Shown instead of `children` while the toggle is not pressed */
    fallback?: Element | undefined
  }
>

/** Shows `children` while the toggle is pressed and `fallback` while it is not */
export function ToggleIndicator<As extends ValidComponent = "div">(props: ToggleIndicatorProps<As>): Element {
  const [indicatorProps, localProps] = splitProps(props, ["fallback"])
  const api = useToggleContext()
  // Swaps the content only when the toggle flips, not whenever the API changes
  const pressed = createMemo(() => api().pressed)
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), localProps, {
      get children() {
        return pressed() ? props.children : indicatorProps.fallback
      },
    }),
  )
}
