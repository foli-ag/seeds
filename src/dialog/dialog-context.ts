import { untrack, type Element } from "solid-js"
import type { UseDialogReturn } from "./use-dialog.js"
import { useDialogContext } from "./use-dialog-context.js"

export interface DialogContextProps {
  children: (api: UseDialogReturn) => Element
}

/** Renders `children` with the dialog's API */
export function DialogContext(props: DialogContextProps): Element {
  return untrack(() => props.children(useDialogContext()))
}
