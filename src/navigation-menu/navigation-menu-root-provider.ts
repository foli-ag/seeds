import { untrack, type Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseNavigationMenuReturn } from "./use-navigation-menu.js"
import { NavigationMenuProvider } from "./use-navigation-menu-context.js"

export type NavigationMenuRootProviderProps<As extends ValidComponent = "nav"> = PartProps<
  As,
  RenderStrategyProps & { value: UseNavigationMenuReturn }
>

/** A root for a navigation menu created with `useNavigationMenu` */
export function NavigationMenuRootProvider<As extends ValidComponent = "nav">(
  props: NavigationMenuRootProviderProps<As>,
): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [, localProps] = splitProps(rest, ["value"])
  return provideNavigationMenu(
    untrack(() => props.value),
    strategy,
    localProps,
  )
}

export function provideNavigationMenu(
  api: UseNavigationMenuReturn,
  strategy: RenderStrategyProps,
  props: PartProps<"nav">,
) {
  // Contents, the indicator and the viewport each mount as the root says
  return provide(NavigationMenuProvider, api, () =>
    provide(
      RenderStrategyContext,
      () => strategy,
      () =>
        render(
          "nav",
          mergeProps(() => api().getRootProps(), props),
        ),
    ),
  )
}
