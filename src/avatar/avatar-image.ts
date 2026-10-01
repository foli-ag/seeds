import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useAvatarContext } from "./use-avatar-context"

export interface AvatarImageProps extends PartProps<"img"> {}

/** Shown once the image has loaded */
export function AvatarImage(props: AvatarImageProps): Element {
  const api = useAvatarContext()
  return render(
    "img",
    mergeProps(() => api().getImageProps(), props),
  )
}
