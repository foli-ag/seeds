import type * as combobox from "@zag-js/combobox"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, combobox.TriggerProps>

/** Opens and closes the list, and is also `Combobox.Trigger.Open` */
export function ComboboxTrigger<As extends ValidComponent = "button">(props: ComboboxTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["focusable"])
  const api = useComboboxContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(triggerProps), localProps),
  )
}
