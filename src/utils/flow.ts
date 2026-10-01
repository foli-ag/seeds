import { createComponent, Show, type Component, type Context, type Element } from "solid-js"

/** `<context value={value}>{children()}</context>` */
export function provide<T>(context: Context<T>, value: T, children: () => Element): Element {
  return createComponent(context, {
    value,
    get children() {
      return children()
    },
  })
}

// The overload that takes plain children, which `createComponent` cannot pick on its own
const ShowElement = Show as Component<{ when: boolean; children: Element }>

/** `<Show when={when()}>{children()}</Show>` */
export function show(when: () => boolean, children: () => Element): Element {
  return createComponent(ShowElement, {
    get when() {
      return when()
    },
    get children() {
      return children()
    },
  })
}
