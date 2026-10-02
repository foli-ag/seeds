import { untrack, type Element } from "solid-js"
import type { UseClipboardReturn } from "./use-clipboard.js"
import { useClipboardContext } from "./use-clipboard-context.js"

export interface ClipboardContextProps {
  children: (api: UseClipboardReturn) => Element
}

/** Renders `children` with the clipboard's API */
export function ClipboardContext(props: ClipboardContextProps): Element {
  return untrack(() => props.children(useClipboardContext()))
}
