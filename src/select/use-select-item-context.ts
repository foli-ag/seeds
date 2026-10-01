import type { ItemProps, ItemState } from "@zag-js/select"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseSelectItemContext = Accessor<ItemState>

export const SelectItemProvider = /* @__PURE__ */ createContext<UseSelectItemContext>()

/** The state of the item around the caller */
export const useSelectItemContext = (): UseSelectItemContext => useContext(SelectItemProvider)

/** The props of the item around the caller, which its parts pass back to the select */
export const SelectItemPropsProvider = /* @__PURE__ */ createContext<ItemProps>()

export const useSelectItemPropsContext = (): ItemProps => useContext(SelectItemPropsProvider)

/** The props of the group around the caller, which its label passes back to the select */
export const SelectGroupPropsProvider = /* @__PURE__ */ createContext<{ id: string }>()

export const useSelectGroupPropsContext = (): { id: string } => useContext(SelectGroupPropsProvider)
