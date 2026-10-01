import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAvatarContext } from "./use-avatar-context.js"

export type AvatarFallbackProps<As extends ValidComponent = "span"> = PartProps<As>

/** Shown until the image has loaded, and when it fails to */
export function AvatarFallback<As extends ValidComponent = "span">(props: AvatarFallbackProps<As>): Element {
  const api = useAvatarContext()
  return render(
    "span",
    mergeProps(() => api().getFallbackProps(), props),
  )
}
