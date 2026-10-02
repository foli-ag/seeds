import * as clipboard from "@zag-js/clipboard"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useClipboard, type UseClipboardProps } from "./use-clipboard.js"
import { ClipboardProvider } from "./use-clipboard-context.js"

export type ClipboardRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseClipboardProps>

/** Holds the value to copy, and is marked `data-copied` for `timeout` milliseconds after each copy */
export function ClipboardRoot<As extends ValidComponent = "div">(props: ClipboardRootProps<As>): Element {
  const [clipboardProps, localProps] = splitProps(props, clipboard.props)
  const api = useClipboard(clipboardProps)
  return provide(ClipboardProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
