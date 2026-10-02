import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export type ClipboardValueTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Shows the value as text, unless it has `children` to show instead */
export function ClipboardValueText<As extends ValidComponent = "span">(props: ClipboardValueTextProps<As>): Element {
  const api = useClipboardContext()
  // zag's anatomy has no value text part, so it is named here the way zag names the others
  return render(
    "span",
    mergeProps({ "data-scope": "clipboard", "data-part": "value-text" }, props, {
      get children() {
        return props.children || api().value
      },
    }),
  )
}
