import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAvatarContext } from "./use-avatar-context.js"

export type AvatarImageProps<As extends ValidComponent = "img"> = PartProps<As>

/** Shown once the image has loaded */
export function AvatarImage<As extends ValidComponent = "img">(props: AvatarImageProps<As>): Element {
  const api = useAvatarContext()
  return render(
    "img",
    mergeProps(() => api().getImageProps(), props),
  )
}
