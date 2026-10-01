import { DialogTrigger } from "./dialog-trigger"
import { DialogTriggerClose } from "./dialog-trigger-close"

export { DialogBackdrop as Backdrop, type DialogBackdropProps as BackdropProps } from "./dialog-backdrop"
export { DialogContent as Content, type DialogContentProps as ContentProps } from "./dialog-content"
export { DialogContext as Context, type DialogContextProps as ContextProps } from "./dialog-context"
export { DialogDescription as Description, type DialogDescriptionProps as DescriptionProps } from "./dialog-description"
export { DialogPositioner as Positioner, type DialogPositionerProps as PositionerProps } from "./dialog-positioner"
export { DialogRoot as Root, type DialogRootProps as RootProps } from "./dialog-root"
export {
  DialogRootProvider as RootProvider,
  type DialogRootProviderProps as RootProviderProps,
} from "./dialog-root-provider"
export { DialogTitle as Title, type DialogTitleProps as TitleProps } from "./dialog-title"
export type { DialogTriggerProps as TriggerProps } from "./dialog-trigger"
export type { DialogTriggerCloseProps as TriggerCloseProps } from "./dialog-trigger-close"
export type { OpenChangeDetails, TriggerValueChangeDetails } from "@zag-js/dialog"

export const Trigger = /* @__PURE__ */ Object.assign(DialogTrigger, { Open: DialogTrigger, Close: DialogTriggerClose })
