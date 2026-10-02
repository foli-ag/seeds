import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerTriggerCloseProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

export function DrawerTriggerClose<As extends ValidComponent = "button">(props: DrawerTriggerCloseProps<As>): Element {
  const api = useDrawerContext()
  return render(
    "button",
    mergeProps(() => api().getCloseTriggerProps(), props),
  )
}
