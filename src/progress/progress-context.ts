import { untrack, type Element } from "solid-js"
import type { UseProgressReturn } from "./use-progress.js"
import { useProgressContext } from "./use-progress-context.js"

export interface ProgressContextProps {
  children: (api: UseProgressReturn) => Element
}

/** Renders `children` with the progress's API */
export function ProgressContext(props: ProgressContextProps): Element {
  return untrack(() => props.children(useProgressContext()))
}
