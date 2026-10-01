import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"

export type MenuSeparatorProps<As extends ValidComponent = "hr"> = PolymorphicProps<As>

export function MenuSeparator<As extends ValidComponent = "hr">(props: MenuSeparatorProps<As>): Element {
  const api = useMenuContext()
  return render(
    "hr",
    mergeProps(() => api().getSeparatorProps(), props),
  )
}
