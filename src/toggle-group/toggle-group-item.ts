import type * as toggleGroup from "@zag-js/toggle-group"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useToggleGroupContext } from "./use-toggle-group-context.js"

export interface ToggleGroupItemProps extends PartProps<"button", toggleGroup.ItemProps> {}

/** A toggle button whose `value` is in the group's value while pressed */
export function ToggleGroupItem(props: ToggleGroupItemProps): Element {
  const [itemProps, localProps] = splitProps(props, ["value", "disabled"])
  const api = useToggleGroupContext()
  return render(
    "button",
    mergeProps(() => api().getItemProps(itemProps), localProps),
  )
}
