import type { PropTypes } from "@foliag/zag"
import * as dialog from "@zag-js/dialog"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseDialogProps extends Optional<Omit<dialog.Props, "getRootNode">, "id"> {}

export type UseDialogReturn = Accessor<dialog.Api<PropTypes>>

export function useDialog(props: MaybeAccessor<UseDialogProps> = {}): UseDialogReturn {
  return useApi(dialog.machine, dialog.connect, props)
}
