import { render } from "@solidjs/testing-library"
import { createSignal, Show } from "solid-js"
import { page } from "vitest/browser"
import { Presence, usePresence, usePresenceContext } from "../src/presence/index.js"

const root = () => document.querySelector<HTMLElement>('[data-scope="presence"][data-part="root"]')

test("shows its children while present and hides them once not", async () => {
  const [present, setPresent] = createSignal(true)
  render(() => <Presence present={present()}>Panel</Presence>)

  await expect.element(page.getByText("Panel")).toBeVisible()
  expect(root()?.dataset.state).toBe("open")

  setPresent(false)
  await expect.element(page.getByText("Panel")).not.toBeVisible()
  expect(root()?.hidden).toBe(true)
  expect(root()?.dataset.state).toBe("closed")
})

interface PanelProps {
  present: boolean
  onExitComplete: () => void
}

// An app's own element wired as Ark wires one: presence's attributes, and its ref given apart. The ref reads the
// presence in a callback because Solid reads a JSX ref untracked.
function RefPanel(props: PanelProps) {
  const presence = usePresence(() => ({
    present: props.present,
    onExitComplete: props.onExitComplete,
    unmountOnExit: true,
  }))
  return (
    <Show when={!presence().unmounted}>
      <div
        data-scope="presence"
        data-part="root"
        hidden={presence().presenceProps.hidden}
        data-state={presence().presenceProps["data-state"]}
        ref={(node) => presence().ref(node)}
      >
        Panel
      </div>
    </Show>
  )
}

test.each([
  [
    "Presence",
    (props: PanelProps) => (
      <Presence present={props.present} unmountOnExit onExitComplete={props.onExitComplete}>
        Panel
      </Presence>
    ),
  ],
  ["an element given usePresence's ref", RefPanel],
])("keeps %s while its exit animation runs, then unmounts it under unmountOnExit", async (_, Panel) => {
  const style = document.createElement("style")
  // A paused animation never ends, so presence waits until the style goes and cancels it
  style.textContent = `
    @keyframes fade-out { to { opacity: 0 } }
    [data-scope="presence"][data-state="closed"] { animation: fade-out 1s paused }
  `
  document.head.append(style)
  onTestFinished(() => style.remove())
  const onExitComplete = vi.fn()
  const [present, setPresent] = createSignal(true)
  render(() => <Panel present={present()} onExitComplete={onExitComplete} />)

  setPresent(false)
  await expect.poll(() => root()?.dataset.state).toBe("closed")
  // zag looks for an exit animation on the next frame, on the element it gets through the ref
  await new Promise(requestAnimationFrame)
  await new Promise(requestAnimationFrame)
  expect(root()?.hidden).toBe(false)
  expect(onExitComplete).not.toHaveBeenCalled()

  style.remove()
  await expect.poll(root).toBeNull()
  expect(onExitComplete).toHaveBeenCalledOnce()
})

test("mounts its children the first time it is present under lazyMount, and keeps them after", async () => {
  const [present, setPresent] = createSignal(false)
  render(() => (
    <Presence present={present()} lazyMount>
      Panel
    </Presence>
  ))

  expect(root()).toBeNull()

  setPresent(true)
  await expect.element(page.getByText("Panel")).toBeVisible()

  setPresent(false)
  await expect.poll(() => root()?.hidden).toBe(true)
})

test("gives its presence to its children", async () => {
  function Status() {
    const presence = usePresenceContext()
    return <>{presence().present ? "Shown" : "Gone"}</>
  }
  const [present, setPresent] = createSignal(true)
  render(() => (
    <Presence present={present()}>
      <Status />
    </Presence>
  ))

  await expect.poll(() => root()?.textContent).toBe("Shown")

  setPresent(false)
  await expect.poll(() => root()?.textContent).toBe("Gone")
})
