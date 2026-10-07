import type { PropTypes } from "@foliag/zag"
import * as clipboard from "@zag-js/clipboard"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, "dir" | "getRootNode">, "id"> {}

export type UseClipboardReturn = Accessor<clipboard.Api<PropTypes>>

export function useClipboard(props: MaybeAccessor<UseClipboardProps> = {}): UseClipboardReturn {
  return useApi(clipboard.machine, clipboard.connect, props)
}
