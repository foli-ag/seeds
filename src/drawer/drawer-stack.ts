import { normalizeProps } from "@foliag/zag"
import * as drawer from "@zag-js/drawer"
import { createMemo, createSignal, onCleanup, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { DrawerStackProvider, DrawerStackStoreProvider } from "./use-drawer-stack-context.js"

export interface DrawerStackProps {
  children?: Element
}

/** Follows the drawers inside it, so that `Drawer.Indent` can make room for the frontmost one */
export function DrawerStack(props: DrawerStackProps): Element {
  const stack = drawer.createStack()
  const [snapshot, setSnapshot] = createSignal(stack.getSnapshot())
  onCleanup(stack.subscribe(() => setSnapshot(stack.getSnapshot())))
  const api = createMemo(() => drawer.connectStack(snapshot(), normalizeProps))
  return provide(DrawerStackStoreProvider, stack, () => provide(DrawerStackProvider, api, () => props.children))
}
