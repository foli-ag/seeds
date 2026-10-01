import * as accordion from "@zag-js/accordion"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence"
import { splitProps } from "../utils/split-props"
import { useAccordion, type UseAccordionProps } from "./use-accordion"
import { AccordionProvider } from "./use-accordion-context"

export interface AccordionRootProps extends PartProps<"div", UseAccordionProps & RenderStrategyProps> {}

export function AccordionRoot(props: AccordionRootProps): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [accordionProps, localProps] = splitProps(rest, accordion.props)
  const api = useAccordion(accordionProps)
  return provide(AccordionProvider, api, () =>
    // Items mount their content as the root says
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
