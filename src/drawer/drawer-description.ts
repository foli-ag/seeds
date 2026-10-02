import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerDescriptionProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function DrawerDescription<As extends ValidComponent = "div">(props: DrawerDescriptionProps<As>): Element {
  const api = useDrawerContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
