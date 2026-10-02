import { normalizeProps, type PropTypes } from "@foliag/zag"
import * as menu from "@zag-js/menu"
import { createMemo, type Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useService } from "../utils/use-api.js"

export interface UseMenuProps extends Optional<Omit<menu.Props, "getRootNode">, "id"> {}

export interface UseMenuReturn {
  api: Accessor<menu.Api<PropTypes>>
  /** The machine, which a menu links to the submenus inside it */
  service: menu.Service
}

export function useMenu(props: MaybeAccessor<UseMenuProps> = {}): UseMenuReturn {
  const service = useService(menu.machine, props)
  const api = createMemo(() => menu.connect(service, normalizeProps))
  return { api, service }
}
