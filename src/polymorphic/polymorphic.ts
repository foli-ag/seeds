import { dynamic, type ComponentProps, type ValidComponent } from "@solidjs/web"
import { createComponent, isStatic, omit, type Element } from "solid-js"

export type { ValidComponent } from "@solidjs/web"

/**
 * Props of a component that renders an `As`: its own element, or the tag or component its caller passes with `as`.
 * `P` holds the component's own props, which win over those of `As`.
 */
export type PolymorphicProps<As extends ValidComponent, P = {}> = P & { as?: As | undefined } & Omit<
    ComponentProps<As>,
    keyof P | "as"
  >

/**
 * Renders `as` with the other props. A component built on it lets its callers swap the element it renders, because
 * the caller's `as`, spread after the default, wins.
 *
 * @example
 * function Button<As extends ValidComponent = "button">(props: PolymorphicProps<As, { variant?: "solid" | "ghost" }>) {
 *   const rest = omit(props, "variant")
 *   return <Polymorphic as="button" data-variant={props.variant ?? "solid"} {...rest} />
 * }
 *
 * <Button as="a" href="/docs" variant="ghost">Docs</Button>
 */
export function Polymorphic<P extends object>(props: P & { as: ValidComponent }): Element {
  // A literal or a plain variable never changes, so only a computed `as` gets a computation of its own
  const Component = dynamic(() => props.as, { static: isStatic(props, "as") })
  return createComponent(Component, omit(props, "as"))
}
