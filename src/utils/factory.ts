import { dynamic, type ValidComponent } from "@solidjs/web"
import { createComponent, omit, untrack, type Element } from "solid-js"

// Parts type their props as their callers type the props of a Polymorphic component
export type { PolymorphicProps, ValidComponent } from "../polymorphic/polymorphic.js"

/** Renders a part as the caller's `as`, or as a `tag` element */
export function render(tag: string, props: object): Element {
  const rest = omit(props as Record<string, unknown>, "as")
  // Most parts keep their own element, which needs no tracking
  if (!untrack(() => "as" in props)) return createComponent(element(tag), rest)
  return createComponent(
    dynamic(() => (props as { as?: ValidComponent }).as ?? tag),
    rest,
  )
}

const elements = new Map<string, (props: any) => Element>()

function element(tag: string) {
  let component = elements.get(tag)
  if (!component) {
    component = dynamic(() => tag, { static: true })
    elements.set(tag, component)
  }
  return component
}
