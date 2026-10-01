import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import type { UseAccordionReturn } from "./use-accordion.js"
import { AccordionProvider } from "./use-accordion-context.js"

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
