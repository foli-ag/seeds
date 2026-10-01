import type { ItemProps, ItemState } from "@zag-js/accordion"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseAccordionItemContext = Accessor<ItemState>

export const AccordionItemProvider = createContext<UseAccordionItemContext>()

/** The state of the item around the caller */
export const useAccordionItemContext = (): UseAccordionItemContext => useContext(AccordionItemProvider)

/** The props of the item around the caller, which its parts pass back to the accordion */
export const AccordionItemPropsProvider = createContext<ItemProps>()

export const useAccordionItemPropsContext = (): ItemProps => useContext(AccordionItemPropsProvider)
