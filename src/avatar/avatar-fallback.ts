import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useAvatarContext } from "./use-avatar-context"

export interface AvatarFallbackProps extends PartProps<"span"> {}

/** Shown until the image has loaded, and when it fails to */
export function AvatarFallback(props: AvatarFallbackProps): Element {
  const api = useAvatarContext()
  return render(
    "span",
    mergeProps(() => api().getFallbackProps(), props),
  )
}
