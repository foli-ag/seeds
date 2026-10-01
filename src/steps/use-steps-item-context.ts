import type { ItemProps, ItemState } from "@zag-js/steps"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseStepsItemContext = Accessor<ItemState>

export const StepsItemProvider = /* @__PURE__ */ createContext<UseStepsItemContext>()

/** The state of the step around the caller */
export const useStepsItemContext = (): UseStepsItemContext => useContext(StepsItemProvider)

/** The props of the step around the caller, which its parts pass back to the steps */
export const StepsItemPropsProvider = /* @__PURE__ */ createContext<ItemProps>()

export const useStepsItemPropsContext = (): ItemProps => useContext(StepsItemPropsProvider)
