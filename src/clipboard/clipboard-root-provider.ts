import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseClipboardReturn } from "./use-clipboard.js"
import { ClipboardProvider } from "./use-clipboard-context.js"

export type ClipboardRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseClipboardReturn }
>

/** A root for a clipboard created with `useClipboard` */
export function ClipboardRootProvider<As extends ValidComponent = "div">(
  props: ClipboardRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(ClipboardProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
