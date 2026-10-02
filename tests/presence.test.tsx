import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page } from "vitest/browser"
import { Presence, usePresenceContext } from "../src/presence/index.js"

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

test("keeps its children while their exit animation runs, then unmounts them under unmountOnExit", async () => {
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
  render(() => (
    <Presence present={present()} unmountOnExit onExitComplete={onExitComplete}>
      Panel
    </Presence>
  ))

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
