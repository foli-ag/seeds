import { createMemo, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  {
    /** Shown instead of `children` while copied */
    copied?: Element | undefined
  }
>

/** Shows `children`, and `copied` instead for `timeout` milliseconds after a copy */
export function ClipboardIndicator<As extends ValidComponent = "div">(props: ClipboardIndicatorProps<As>): Element {
  const [indicatorProps, localProps] = splitProps(props, ["copied"])
  const api = useClipboardContext()
  // Swaps the content only when a copy starts or ends, not whenever the API changes
  const copied = createMemo(() => api().copied)
  return render(
    "div",
    // zag hides an indicator whose `copied` differs from the state, so passing the state keeps this one shown
    mergeProps(() => api().getIndicatorProps({ copied: api().copied }), localProps, {
      get children() {
        return copied() ? indicatorProps.copied : props.children
      },
    }),
  )
}
