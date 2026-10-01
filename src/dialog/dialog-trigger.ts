import type * as dialog from "@zag-js/dialog"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export interface DialogTriggerProps extends PartProps<"button", dialog.TriggerProps> {}

/** Opens the dialog, and is also `Dialog.Trigger.Open` */
export function DialogTrigger(props: DialogTriggerProps): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useDialogContext()
  const presence = usePresenceContext()
  const merged = mergeProps(
    () => api().getTriggerProps(triggerProps),
    // Points at nothing while the content is unmounted
    () => ({ "aria-controls": presence().unmounted ? null : undefined }),
    localProps,
  )
  return render("button", merged)
}
