import type { ItemProps, ItemState } from "@zag-js/combobox"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseComboboxItemContext = Accessor<ItemState>

export const ComboboxItemProvider = /* @__PURE__ */ createContext<UseComboboxItemContext>()

/** The state of the item around the caller */
export const useComboboxItemContext = (): UseComboboxItemContext => useContext(ComboboxItemProvider)

/** The props of the item around the caller, which its parts pass back to the combobox */
export const ComboboxItemPropsProvider = /* @__PURE__ */ createContext<ItemProps>()

export const useComboboxItemPropsContext = (): ItemProps => useContext(ComboboxItemPropsProvider)

/** The props of the group around the caller, which its label passes back to the combobox */
export const ComboboxGroupPropsProvider = /* @__PURE__ */ createContext<{ id: string }>()

export const useComboboxGroupPropsContext = (): { id: string } => useContext(ComboboxGroupPropsProvider)
