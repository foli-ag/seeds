import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** Shows the value read-only and selects it on focus. Copying from it counts as a copy. */
export function ClipboardInput<As extends ValidComponent = "input">(props: ClipboardInputProps<As>): Element {
  const api = useClipboardContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
