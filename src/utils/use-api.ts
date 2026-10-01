import { normalizeProps, useMachine, type PropTypes } from "@foliag/zag"
import type { Machine, MachineSchema, Service } from "@zag-js/core"
import type { NormalizeProps } from "@zag-js/types"
import { compact } from "@zag-js/utils"
import { createMemo, createUniqueId, type Accessor } from "solid-js"
import { access, type MaybeAccessor } from "./types.js"

/**
 * Runs `machine` with a generated id unless `props` has one, and connects it to Solid.
 *
 * Each hook types its own `props`: machine schemas mark defaulted props as required, which
 * `exactOptionalPropertyTypes` will not match against the optional props users pass.
 */
export function useApi<S extends MachineSchema, A>(
  machine: Machine<S>,
  connect: (service: Service<S>, normalize: NormalizeProps<PropTypes>) => A,
  props: MaybeAccessor<object>,
): Accessor<A> {
  const id = createUniqueId()
  // `compact` drops props passed as undefined, which would otherwise override the generated id
  const service = useMachine(
    machine,
    () => ({ id, ...compact(access(props) as Record<string, unknown>) }) as Partial<S["props"]>,
  )
  return createMemo(() => connect(service, normalizeProps))
}
