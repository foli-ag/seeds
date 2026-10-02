import { getDocument, getWindow } from "@zag-js/dom-query"
import type { Element } from "solid-js"
import { render } from "../utils/factory.js"
import { provide, show } from "../utils/flow.js"
import { access } from "../utils/types.js"
import { EnvironmentContextProvider, type EnvironmentContext, type RootNode } from "./use-environment-context.js"

export interface EnvironmentProviderProps {
  /** The root node, or a function that returns it. Without it, the provider uses the root node it renders in */
  value?: RootNode | (() => RootNode) | undefined
  children?: Element
}

/** Points the machines inside at the document or shadow root that holds their elements */
export function EnvironmentProvider(props: EnvironmentProviderProps): Element {
  // Read when a machine looks up an element, never while rendering, so the server never reaches `document`
  let span: HTMLSpanElement | undefined
  const getRootNode = (): RootNode => {
    const value = access(props.value)
    if (value) return value
    // Out of the DOM, before mounting or after unmounting, the span is its own root node, which has no
    // `getElementById`. A frame a machine scheduled before unmounting would then throw.
    return span?.isConnected ? span.getRootNode() : document
  }
  const environment: EnvironmentContext = {
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  }
  return provide(EnvironmentContextProvider, environment, () => [
    props.children,
    show(
      () => !props.value,
      () =>
        render("span", {
          hidden: true,
          ref: (node: HTMLSpanElement) => {
            span = node
          },
        }),
    ),
  ])
}
