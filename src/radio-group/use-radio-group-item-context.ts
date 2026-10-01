import type { ItemProps, ItemState } from "@zag-js/radio-group"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseRadioGroupItemContext = Accessor<ItemState>

export const RadioGroupItemProvider = createContext<UseRadioGroupItemContext>()

/** The state of the item around the caller */
export const useRadioGroupItemContext = (): UseRadioGroupItemContext => useContext(RadioGroupItemProvider)

/** The props of the item around the caller, which its parts pass back to the group */
export const RadioGroupItemPropsProvider = createContext<ItemProps>()

export const useRadioGroupItemPropsContext = (): ItemProps => useContext(RadioGroupItemPropsProvider)
