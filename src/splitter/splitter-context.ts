import { untrack, type Element } from "solid-js"
import type { UseSplitterReturn } from "./use-splitter.js"
import { useSplitterContext } from "./use-splitter-context.js"

export interface SplitterContextProps {
  children: (api: UseSplitterReturn) => Element
}

/** Renders `children` with the splitter's API */
export function SplitterContext(props: SplitterContextProps): Element {
  return untrack(() => props.children(useSplitterContext()))
}
