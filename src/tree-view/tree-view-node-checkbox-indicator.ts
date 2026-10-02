import { createComponent, Show, type Component, type Element } from "solid-js"
import { useTreeViewNodeContext } from "./use-tree-view-node-context.js"

export interface TreeViewNodeCheckboxIndicatorProps {
  /** Shown while the node is checked */
  children?: Element
  /** Shown while a branch has some of its descendants checked, or `fallback` if left out */
  indeterminate?: Element
  /** Shown while the node is unchecked */
  fallback?: Element
}

// The overload that takes plain children, which `createComponent` cannot pick on its own
const ShowElement = Show as Component<{ when: boolean; fallback: Element; children: Element }>

/** Renders the content for its node's checked state, without an element of its own */
export function TreeViewNodeCheckboxIndicator(props: TreeViewNodeCheckboxIndicatorProps): Element {
  const node = useTreeViewNodeContext()
  return createComponent(ShowElement, {
    get when() {
      return node().checked === true
    },
    get children() {
      return props.children ?? props.fallback
    },
    get fallback() {
      return createComponent(ShowElement, {
        get when() {
          return node().checked === "indeterminate"
        },
        get children() {
          return props.indeterminate ?? props.fallback
        },
        get fallback() {
          return props.fallback
        },
      })
    },
  })
}
