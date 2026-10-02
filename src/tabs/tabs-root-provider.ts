import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseTabsReturn } from "./use-tabs.js"
import { TabsProvider } from "./use-tabs-context.js"

export type TabsRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  RenderStrategyProps & { value: UseTabsReturn }
>

/** A root for tabs created with `useTabs` */
export function TabsRootProvider<As extends ValidComponent = "div">(props: TabsRootProviderProps<As>): Element {
  const [strategy, localProps] = splitProps(props, [...renderStrategyKeys, "value"])
  const api = untrack(() => props.value)
  return provide(TabsProvider, api, () =>
    provide(
      RenderStrategyContext,
      () => strategy,
      () =>
        render(
          "div",
          mergeProps(() => api().getRootProps(), localProps),
        ),
    ),
  )
}
