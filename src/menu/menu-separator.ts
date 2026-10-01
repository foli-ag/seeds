import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuSeparatorProps extends PartProps<"hr"> {}

export function MenuSeparator(props: MenuSeparatorProps): Element {
  const api = useMenuContext()
  return render(
    "hr",
    mergeProps(() => api().getSeparatorProps(), props),
  )
}
