import type { PropTypes } from "@foliag/zag"
import * as steps from "@zag-js/steps"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseStepsProps extends Optional<Omit<steps.Props, "dir" | "getRootNode">, "id"> {}

export type UseStepsReturn = Accessor<steps.Api<PropTypes>>

export function useSteps(props: MaybeAccessor<UseStepsProps> = {}): UseStepsReturn {
  return useApi(steps.machine, steps.connect, props)
}
