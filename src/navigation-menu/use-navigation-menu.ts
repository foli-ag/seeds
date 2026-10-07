import type { PropTypes } from "@foliag/zag"
import * as navigationMenu from "@zag-js/navigation-menu"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseNavigationMenuProps extends Optional<Omit<navigationMenu.Props, "dir" | "getRootNode">, "id"> {}

export type UseNavigationMenuReturn = Accessor<navigationMenu.Api<PropTypes>>

export function useNavigationMenu(props: MaybeAccessor<UseNavigationMenuProps> = {}): UseNavigationMenuReturn {
  return useApi(navigationMenu.machine, navigationMenu.connect, props)
}
