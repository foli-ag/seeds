import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAvatarContext } from "./use-avatar-context.js"

export interface AvatarImageProps extends PartProps<"img"> {}

/** Shown once the image has loaded */
export function AvatarImage(props: AvatarImageProps): Element {
  const api = useAvatarContext()
  return render(
    "img",
    mergeProps(() => api().getImageProps(), props),
  )
}
