import { DialogTrigger } from "./dialog-trigger.js"
import { DialogTriggerClose } from "./dialog-trigger-close.js"

export { DialogBackdrop as Backdrop, type DialogBackdropProps as BackdropProps } from "./dialog-backdrop.js"
export { DialogContent as Content, type DialogContentProps as ContentProps } from "./dialog-content.js"
export { DialogContext as Context, type DialogContextProps as ContextProps } from "./dialog-context.js"
export {
  DialogDescription as Description,
  type DialogDescriptionProps as DescriptionProps,
} from "./dialog-description.js"
export { DialogPositioner as Positioner, type DialogPositionerProps as PositionerProps } from "./dialog-positioner.js"
export { DialogRoot as Root, type DialogRootProps as RootProps } from "./dialog-root.js"
export {
  DialogRootProvider as RootProvider,
  type DialogRootProviderProps as RootProviderProps,
} from "./dialog-root-provider.js"
export { DialogTitle as Title, type DialogTitleProps as TitleProps } from "./dialog-title.js"
export type { DialogTriggerProps as TriggerProps } from "./dialog-trigger.js"
export type { DialogTriggerCloseProps as TriggerCloseProps } from "./dialog-trigger-close.js"
export type { OpenChangeDetails, TriggerValueChangeDetails } from "@zag-js/dialog"

export const Trigger = /* @__PURE__ */ Object.assign(DialogTrigger, { Open: DialogTrigger, Close: DialogTriggerClose })
