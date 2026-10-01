import { Portal } from "@solidjs/web"
import { createComponent, createMemo, Show, useContext, type Component, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide, show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { NavigationMenuItemPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export type NavigationMenuContentProps<As extends ValidComponent = "div"> = PartProps<
  As,
  { value?: string | undefined }
>

/**
 * Shown while its item is open. It takes the value of the item around it unless given one, and moves into the
 * viewport when there is one, leaving proxies in place for focus to move through.
 */
export function NavigationMenuContent<As extends ValidComponent = "div">(
  props: NavigationMenuContentProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const item = useContext(NavigationMenuItemPropsProvider)
  const contentProps = {
    get value() {
      return props.value ?? item?.value ?? ""
    },
  }
  const api = useNavigationMenuContext()
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().value === contentProps.value }))
  const merged = mergeProps(
    () => api().getContentProps(contentProps),
    () => presence().presenceProps,
    localProps,
  )
  const content = () =>
    provide(PresenceContext, presence, () =>
      show(
        () => !presence().unmounted,
        () => render("div", merged),
      ),
    )
  const viewport = createMemo(() => (api().isViewportRendered ? api().getViewportNode() : null))
  return createComponent(ShowWithFallback, {
    get when() {
      return !!viewport()
    },
    get fallback() {
      return content()
    },
    get children() {
      return [
        render(
          "div",
          mergeProps(() => api().getViewportProxyProps(contentProps)),
        ),
        render(
          "div",
          mergeProps(() => api().getTriggerProxyProps(contentProps)),
        ),
        createComponent(Portal, {
          get mount() {
            return viewport()!
          },
          get children() {
            return content()
          },
        }),
      ]
    },
  })
}

// The overload that takes plain children, which `createComponent` cannot pick on its own
const ShowWithFallback = Show as Component<{ when: boolean; fallback: Element; children: Element }>
