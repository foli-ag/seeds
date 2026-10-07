import { normalizeProps, useMachine, type PropTypes } from "@foliag/zag"
import type { Machine, MachineSchema, Service } from "@zag-js/core"
import type { NormalizeProps } from "@zag-js/types"
import { compact } from "@zag-js/utils"
import { createMemo, createUniqueId, type Accessor } from "solid-js"
import { useEnvironmentContext } from "../environment/use-environment-context.js"
import { useLocaleContext } from "../locale/use-locale-context.js"
import { access, type MaybeAccessor } from "./types.js"

/**
 * Runs `machine` and connects it to Solid.
 *
 * Each hook types its own `props`: machine schemas mark defaulted props as required, which
 * `exactOptionalPropertyTypes` will not match against the optional props users pass.
 */
export function useApi<S extends MachineSchema, A>(
  machine: Machine<S>,
  connect: (service: Service<S>, normalize: NormalizeProps<PropTypes>) => A,
  props: MaybeAccessor<object>,
): Accessor<A> {
  const service = useService(machine, props)
  return createMemo(() => connect(service, normalizeProps))
}

/**
 * Runs `machine` with a generated id unless `props` has one, looking up its elements in the root node of the
 * surrounding `EnvironmentProvider`, in the locale and direction of the surrounding `LocaleProvider`
 */
export function useService<S extends MachineSchema>(machine: Machine<S>, props: MaybeAccessor<object>): Service<S> {
  const id = createUniqueId()
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()
  // `compact` drops props passed as undefined, which would otherwise override the generated id
  return useMachine(
    machine,
    () =>
      ({
        id,
        dir: locale().dir,
        // Only the machines that format numbers read it. A `locale` in `props` wins.
        locale: locale().locale,
        getRootNode: environment().getRootNode,
        ...compact(access(props) as Record<string, unknown>),
      }) as Partial<S["props"]>,
  )
}
