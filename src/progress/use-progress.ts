import type { PropTypes } from "@foliag/zag"
import * as progress from "@zag-js/progress"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseProgressProps extends Optional<Omit<progress.Props, "getRootNode">, "id"> {}

export type UseProgressReturn = Accessor<progress.Api<PropTypes>>

export function useProgress(props: MaybeAccessor<UseProgressProps> = {}): UseProgressReturn {
  return useApi(progress.machine, progress.connect, props)
}
