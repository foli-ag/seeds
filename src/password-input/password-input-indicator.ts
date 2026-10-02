import { createMemo, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePasswordInputContext } from "./use-password-input-context.js"

export type PasswordInputIndicatorProps<As extends ValidComponent = "span"> = PolymorphicProps<
  As,
  {
    /** Shown instead of `children` while the password is hidden */
    fallback?: Element | undefined
  }
>

/** Shows `children` while the password is visible and `fallback` while it is hidden */
export function PasswordInputIndicator<As extends ValidComponent = "span">(
  props: PasswordInputIndicatorProps<As>,
): Element {
  const [indicatorProps, localProps] = splitProps(props, ["fallback"])
  const api = usePasswordInputContext()
  // Swaps the content only when the visibility flips, not whenever the API changes
  const visible = createMemo(() => api().visible)
  return render(
    "span",
    mergeProps(() => api().getIndicatorProps(), localProps, {
      get children() {
        return visible() ? props.children : indicatorProps.fallback
      },
    }),
  )
}
