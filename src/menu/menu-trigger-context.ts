import type * as menu from "@zag-js/menu"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuTriggerContextProps extends PartProps<"div", menu.TriggerProps> {}

/** An area that opens the menu at the pointer on right click or long press */
export function MenuTriggerContext(props: MenuTriggerContextProps): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useMenuContext()
  return render(
    "div",
    mergeProps(() => api().getContextTriggerProps(triggerProps), localProps),
  )
}
