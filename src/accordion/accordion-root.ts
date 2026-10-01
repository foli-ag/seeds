import * as accordion from "@zag-js/accordion"
import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { RenderStrategyContext, renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useAccordion, type UseAccordionProps } from "./use-accordion.js"
import { AccordionProvider } from "./use-accordion-context.js"

export type AccordionRootProps<As extends ValidComponent = "div"> = PartProps<
  As,
  UseAccordionProps & RenderStrategyProps
>

export function AccordionRoot<As extends ValidComponent = "div">(props: AccordionRootProps<As>): Element {
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
