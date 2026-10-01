import type * as dialog from "@zag-js/dialog"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useDialogContext } from "./use-dialog-context.js"

export type DialogTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<T, dialog.TriggerProps>

/** Opens the dialog, and is also `Dialog.Trigger.Open` */
export function DialogTrigger<T extends ValidComponent = "button">(props: DialogTriggerProps<T>): Element {
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
