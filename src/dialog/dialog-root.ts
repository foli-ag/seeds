import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { provideDialog } from "./dialog-root-provider.js"
import { useDialog, type UseDialogProps } from "./use-dialog.js"

export interface DialogRootProps extends UseDialogProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

export function DialogRoot(props: DialogRootProps): Element {
  const [presenceProps, dialogProps] = splitPresenceProps(props)
  const api = useDialog(omit(dialogProps, "children"))
  return provideDialog(api, presenceProps, () => props.children)
}
