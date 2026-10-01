import { normalizeProps, useMachine } from "@foliag/zag"
import * as presence from "@zag-js/presence"
import { createContext, createMemo, useContext, type Accessor } from "solid-js"
import { splitProps } from "./split-props"
import { access, type MaybeAccessor } from "./types"

export interface RenderStrategyProps {
  /** Mounts the content the first time it opens instead of with the root */
  lazyMount?: boolean | undefined
  /** Unmounts the content once it has closed and its exit animation has ended */
  unmountOnExit?: boolean | undefined
}

export interface UsePresenceProps extends RenderStrategyProps, presence.Props {
  /** Leaves `data-state` unset on first render, so an initially open content does not run its enter animation */
  skipAnimationOnMount?: boolean | undefined
}

export interface PresenceApi {
  /** Whether the content is shown, which stays true while its exit animation runs */
  present: boolean
  /** Whether the content is out of the DOM */
  unmounted: boolean
  /** Props for the element whose animations presence waits for */
  presenceProps: {
    ref: (node: HTMLElement | null) => void
    hidden: boolean
    "data-state": "open" | "closed" | undefined
  }
}

export type UsePresenceReturn = Accessor<PresenceApi>

export const presenceKeys = [
  "immediate",
  "lazyMount",
  "onEnterComplete",
  "onExitComplete",
  "present",
  "skipAnimationOnMount",
  "unmountOnExit",
] as const satisfies readonly (keyof UsePresenceProps)[]

export const renderStrategyKeys = [
  "lazyMount",
  "unmountOnExit",
] as const satisfies readonly (keyof RenderStrategyProps)[]

/** Splits the presence props, which a root forwards to its content, from the machine's */
export function splitPresenceProps<T extends UsePresenceProps>(props: T) {
  return splitProps(props, presenceKeys)
}

export function usePresence(props: MaybeAccessor<UsePresenceProps>): UsePresenceReturn {
  const service = useMachine(presence.machine, () => {
    const { present, immediate, onEnterComplete, onExitComplete } = access(props)
    return { present, immediate, onEnterComplete, onExitComplete }
  })
  const api = createMemo(() => presence.connect(service, normalizeProps))
  const unmounted = useUnmounted(
    () => access(props),
    () => api().present,
  )

  const ref = (node: HTMLElement | null) => {
    if (node) service.send({ type: "NODE.SET", node })
  }

  return createMemo(() => {
    const { skipAnimationOnMount, present } = access(props)
    const { present: shown, skip } = api()
    return {
      present: shown,
      unmounted: unmounted(),
      presenceProps: {
        ref,
        hidden: !shown,
        "data-state": skip && skipAnimationOnMount ? undefined : present ? "open" : "closed",
      },
    }
  })
}

/** Whether content that is `shown` or not stays out of the DOM under a render strategy */
export function useUnmounted(strategy: Accessor<RenderStrategyProps>, shown: Accessor<boolean>): Accessor<boolean> {
  // Latches on first show, after which lazyMount no longer holds the content back
  const wasShown = createMemo((prev: boolean | undefined) => prev || shown())
  return () => {
    if (shown()) return false
    const { lazyMount, unmountOnExit } = strategy()
    return !!(wasShown() ? unmountOnExit : lazyMount)
  }
}

export const PresenceContext = createContext<UsePresenceReturn>()

export const usePresenceContext = () => useContext(PresenceContext)

/** How a root wants its content mounted, for parts that run a presence of their own (a dialog's backdrop) */
export const RenderStrategyContext = createContext<Accessor<RenderStrategyProps>>()

export const useRenderStrategyContext = () => useContext(RenderStrategyContext)
