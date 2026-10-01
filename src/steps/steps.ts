import { StepsItem } from "./steps-item.js"
import { StepsItemContext } from "./steps-item-context.js"
import { StepsItemTrigger } from "./steps-item-trigger.js"

export {
  StepsCompletedContent as CompletedContent,
  type StepsCompletedContentProps as CompletedContentProps,
} from "./steps-completed-content.js"
export { StepsContent as Content, type StepsContentProps as ContentProps } from "./steps-content.js"
export { StepsContext as Context, type StepsContextProps as ContextProps } from "./steps-context.js"
export { StepsIndicator as Indicator, type StepsIndicatorProps as IndicatorProps } from "./steps-indicator.js"
export type { StepsItemProps as ItemProps } from "./steps-item.js"
export type { StepsItemContextProps as ItemContextProps } from "./steps-item-context.js"
export type { StepsItemTriggerProps as ItemTriggerProps } from "./steps-item-trigger.js"
export { StepsList as List, type StepsListProps as ListProps } from "./steps-list.js"
export { StepsProgress as Progress, type StepsProgressProps as ProgressProps } from "./steps-progress.js"
export { StepsRoot as Root, type StepsRootProps as RootProps } from "./steps-root.js"
export {
  StepsRootProvider as RootProvider,
  type StepsRootProviderProps as RootProviderProps,
} from "./steps-root-provider.js"
export { StepsSeparator as Separator, type StepsSeparatorProps as SeparatorProps } from "./steps-separator.js"
export * as Trigger from "./steps-trigger.js"
export type { StepChangeDetails, StepInvalidDetails, ItemState } from "@zag-js/steps"

export const Item = /* @__PURE__ */ Object.assign(StepsItem, {
  Trigger: StepsItemTrigger,
  Context: StepsItemContext,
})
