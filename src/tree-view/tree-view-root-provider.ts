import type { TreeNode } from "@zag-js/collection"
import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseTreeViewReturn } from "./use-tree-view.js"
import { TreeViewProvider } from "./use-tree-view-context.js"

export type TreeViewRootProviderProps<
  T extends TreeNode = TreeNode,
  As extends ValidComponent = "div",
> = PolymorphicProps<As, RenderStrategyProps & { value: UseTreeViewReturn<T> }>

/** A root for a tree view created with `useTreeView` */
export function TreeViewRootProvider<T extends TreeNode = TreeNode, As extends ValidComponent = "div">(
  props: TreeViewRootProviderProps<T, As>,
): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [, localProps] = splitProps(rest, ["value"])
  return provideTreeView(
    untrack(() => props.value),
    strategy,
    localProps,
  )
}

export function provideTreeView(api: UseTreeViewReturn, strategy: RenderStrategyProps, props: PolymorphicProps<"div">) {
  return provide(TreeViewProvider, api, () =>
    // Branches mount their content as the root says
    provide(
      RenderStrategyContext,
      () => strategy,
      () =>
        render(
          "div",
          mergeProps(() => api().getRootProps(), props),
        ),
    ),
  )
}
