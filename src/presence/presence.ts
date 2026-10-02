import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide, show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { PresenceContext, splitPresenceProps, usePresence, type UsePresenceProps } from "../utils/presence.js"

export type PresenceProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UsePresenceProps>

/**
 * Shows its children while `present`, and keeps them until their exit animation ends before hiding them, or unmounting
 * them under `unmountOnExit`. Its children read the presence with `usePresenceContext`.
 */
export function Presence<As extends ValidComponent = "div">(props: PresenceProps<As>): Element {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const presence = usePresence(presenceProps)
  // zag's presence has no anatomy, so the part is named as Ark names it
  const merged = mergeProps(() => presence().presenceProps, localProps, {
    "data-scope": "presence",
    "data-part": "root",
  })
  return provide(PresenceContext, presence, () =>
    show(
      () => !presence().unmounted,
      () => render("div", merged),
    ),
  )
}
