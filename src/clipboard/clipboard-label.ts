import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

/** Names the input */
export function ClipboardLabel<As extends ValidComponent = "label">(props: ClipboardLabelProps<As>): Element {
  const api = useClipboardContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
