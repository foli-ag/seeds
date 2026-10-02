import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Groups the input and the trigger */
export function ClipboardControl<As extends ValidComponent = "div">(props: ClipboardControlProps<As>): Element {
  const api = useClipboardContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
