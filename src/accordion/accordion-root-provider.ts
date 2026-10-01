import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence"
import { splitProps } from "../utils/split-props"
import type { UseAccordionReturn } from "./use-accordion"
import { AccordionProvider } from "./use-accordion-context"

export interface AccordionRootProviderProps
  extends PartProps<"div", RenderStrategyProps & { value: UseAccordionReturn }> {}

/** A root for an accordion created with `useAccordion` */
export function AccordionRootProvider(props: AccordionRootProviderProps): Element {
  const [strategy, localProps] = splitProps(props, [...renderStrategyKeys, "value"])
  const api = untrack(() => props.value)
  return provide(AccordionProvider, api, () =>
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
