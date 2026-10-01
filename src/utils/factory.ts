import { dynamic, type ComponentProps, type ValidComponent } from "@solidjs/web"
import { createComponent, omit, untrack, type Element } from "solid-js"

export type { ValidComponent } from "@solidjs/web"

/**
 * Props of a part that renders a `T`, its own element unless the caller passes `as`. `as` takes another tag, or a
 * component that receives the part's props and spreads them onto its element. `P` wins over the props of `T`.
 *
 * @example
 * <Dialog.Trigger as={Button} variant="ghost">Open</Dialog.Trigger>
 */
export type PartProps<T extends ValidComponent, P = {}> = P & { as?: T | undefined } & Omit<
    ComponentProps<T>,
    keyof P | "as"
  >

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
