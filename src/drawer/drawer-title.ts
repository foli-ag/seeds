import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerTitleProps<As extends ValidComponent = "h2"> = PolymorphicProps<As>

export function DrawerTitle<As extends ValidComponent = "h2">(props: DrawerTitleProps<As>): Element {
  const api = useDrawerContext()
  return render(
    "h2",
    mergeProps(() => api().getTitleProps(), props),
  )
}
