import type * as dialog from "@zag-js/dialog"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { usePresenceContext } from "../utils/presence"
import { splitProps } from "../utils/split-props"
import { useDialogContext } from "./use-dialog-context"

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
