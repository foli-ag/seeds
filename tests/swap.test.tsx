import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Swap, useSwap } from "../src/swap/index.js"

function Copy(props: Swap.RootProps) {
  return (
    <Swap.Root {...props}>
      <Swap.Indicator type="on">Copied</Swap.Indicator>
      <Swap.Indicator type="off">Copy</Swap.Indicator>
    </Swap.Root>
  )
}

const root = () => document.querySelector<HTMLElement>('[data-scope="swap"][data-part="root"]')!
const indicator = (type: "on" | "off") =>
  document.querySelector<HTMLElement>(`[data-scope="swap"][data-part="indicator"][data-type="${type}"]`)

test("shows the indicator of the current state and hides the other", async () => {
  const [swap, setSwap] = createSignal(false)
  render(() => <Copy swap={swap()} />)

  await expect.element(indicator("off")!).toBeVisible()
  await expect.element(indicator("on")!).not.toBeVisible()
  expect(root().dataset.swap).toBe("off")

  setSwap(true)
  await expect.element(indicator("on")!).toBeVisible()
  await expect.element(indicator("off")!).not.toBeVisible()
  expect(root().dataset.swap).toBe("on")
})

test("skips the enter animation on the first render, then holds the leaving indicator over the entering one until its exit animation ends", async () => {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fade-out { to { opacity: 0 } }
    [data-part="indicator"][data-state="closed"] { animation: fade-out 200ms }
  `
  document.head.append(style)
  onTestFinished(() => style.remove())
  const [swap, setSwap] = createSignal(false)
  render(() => <Copy swap={swap()} unmountOnExit />)

  expect(indicator("off")!.dataset.state).toBeUndefined()

  setSwap(true)
  await expect.poll(() => indicator("off")?.dataset.state).toBe("closed")
  expect(indicator("on")!.dataset.state).toBe("open")
  const leaving = indicator("off")!.getBoundingClientRect()
  const entering = indicator("on")!.getBoundingClientRect()
  expect([leaving.left, leaving.top]).toEqual([entering.left, entering.top])
  await expect.poll(() => indicator("off")).toBeNull()
})

test("mounts an indicator the first time it shows with lazyMount", async () => {
  const [swap, setSwap] = createSignal(false)
  render(() => <Copy swap={swap()} lazyMount />)

  expect(indicator("on")).toBeNull()

  setSwap(true)
  await expect.poll(() => indicator("on")).not.toBeNull()
  await expect.element(indicator("on")!).toBeVisible()
})

test("renders a swap created with useSwap through RootProvider, and its API through Context", async () => {
  function Toggle() {
    const [on, setOn] = createSignal(false)
    const swap = useSwap(() => ({ swap: on() }))
    return (
      <>
        <button type="button" onClick={() => setOn(!on())}>
          Toggle
        </button>
        <Swap.RootProvider value={swap}>
          <Swap.Indicator type="on">On</Swap.Indicator>
          <Swap.Indicator type="off">Off</Swap.Indicator>
          <Swap.Context>{(api) => <span>{api().swap ? "is on" : "is off"}</span>}</Swap.Context>
        </Swap.RootProvider>
      </>
    )
  }
  render(() => <Toggle />)

  await expect.element(page.getByText("is off")).toBeVisible()

  await userEvent.click(page.getByRole("button", { name: "Toggle" }))
  await expect.element(indicator("on")!).toBeVisible()
  await expect.element(indicator("off")!).not.toBeVisible()
  await expect.element(page.getByText("is on")).toBeVisible()
})
