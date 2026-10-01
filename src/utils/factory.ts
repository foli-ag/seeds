import { dynamic, type JSX } from "@solidjs/web"
import { createComponent, omit, untrack, type Element } from "solid-js"
import { mergeProps } from "./merge-props.js"

export type ElementType = keyof JSX.IntrinsicElements

export type HTMLProps<T extends ElementType> = JSX.IntrinsicElements[T]

/** Props an `asChild` element receives, typed loosely enough to spread onto any element */
export type AsChildProps = JSX.HTMLAttributes<any> & Record<string, unknown>

export type PolymorphicProps<T extends ElementType> = {
  /**
   * Renders your own element instead of the part's. The function it receives merges your props into the part's.
   *
   * @example
   * <Dialog.Trigger asChild={(props) => <a {...props({ href: "#" })} />} />
   */
  asChild?: ((props: (userProps?: AsChildProps) => AsChildProps) => Element) | undefined
}

/** Props of a part that renders a `T` element, with `P` taking precedence over the element's attributes */
export type PartProps<T extends ElementType, P = {}> = P & PolymorphicProps<T> & Omit<HTMLProps<T>, keyof P>

/** Renders a part as a `tag` element, or through `asChild` when the caller passes it */
export function render<T extends ElementType>(tag: T, props: HTMLProps<T> & PolymorphicProps<T>): Element {
  // A part renders either its own element or the caller's, for its whole life
  const asChild = untrack(() => props.asChild)
  const rest = omit(props, "asChild") as HTMLProps<T>
  if (asChild) return asChild((userProps) => mergeProps(rest as AsChildProps, userProps ?? {}))
  return createComponent(element(tag), rest)
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
