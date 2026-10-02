import * as tabs from "@zag-js/tabs"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useTabs, type UseTabsProps } from "./use-tabs.js"
import { TabsProvider } from "./use-tabs-context.js"

export type TabsRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseTabsProps & RenderStrategyProps>

export function TabsRoot<As extends ValidComponent = "div">(props: TabsRootProps<As>): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [tabsProps, localProps] = splitProps(rest, tabs.props)
  const api = useTabs(tabsProps)
  return provide(TabsProvider, api, () =>
    // Contents mount as the root says
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
