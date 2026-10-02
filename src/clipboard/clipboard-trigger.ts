import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Copies the value. Its accessible name is "Copy to clipboard", and "Copied to clipboard" while copied. */
export function ClipboardTrigger<As extends ValidComponent = "button">(props: ClipboardTriggerProps<As>): Element {
  const api = useClipboardContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(), props),
  )
}
