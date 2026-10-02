import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Toggle, useToggle } from "../src/toggle/index.js"

function Basic(props: Toggle.RootProps) {
  return (
    <Toggle.Root aria-label="Bold" {...props}>
      <Toggle.Indicator fallback="Off">On</Toggle.Indicator>
    </Toggle.Root>
  )
}

const toggle = () => page.getByRole("button", { name: "Bold" })

test("presses and releases on click, reporting each change", async () => {
  const onPressedChange = vi.fn()
  render(() => <Basic onPressedChange={onPressedChange} />)

  await expect.element(toggle()).toHaveAttribute("aria-pressed", "false")
  await userEvent.click(toggle())
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "true")
  await expect.element(toggle()).toHaveAttribute("data-state", "on")
  expect(onPressedChange).toHaveBeenLastCalledWith(true)

  await userEvent.click(toggle())
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "false")
  await expect.element(toggle()).toHaveAttribute("data-state", "off")
  expect(onPressedChange).toHaveBeenLastCalledWith(false)
})

test("presses from the keyboard", async () => {
  render(() => <Basic />)

  await userEvent.tab()
  await expect.element(toggle()).toHaveFocus()
  await userEvent.keyboard(" ")
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "true")
  await userEvent.keyboard("{Enter}")
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "false")
})

test("ignores presses while disabled", async () => {
  render(() => <Basic disabled />)

  await expect.element(toggle()).toBeDisabled()
  await userEvent.click(toggle(), { force: true })
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "false")
})

test("follows `pressed` when controlled", async () => {
  const [pressed, setPressed] = createSignal(false)
  render(() => <Basic pressed={pressed()} onPressedChange={setPressed} />)

  await userEvent.click(toggle())
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "true")

  setPressed(false)
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "false")
})

test("the indicator shows its children while pressed and its fallback otherwise", async () => {
  render(() => <Basic defaultPressed />)

  await expect.element(toggle()).toHaveTextContent(/^On$/)
  await userEvent.click(toggle())
  await expect.element(toggle()).toHaveTextContent(/^Off$/)
})

test("RootProvider renders a toggle driven from outside through useToggle", async () => {
  function External() {
    const api = useToggle()
    return (
      <>
        <button type="button" onClick={() => api().setPressed(true)}>
          Press from outside
        </button>
        <Toggle.RootProvider value={api} aria-label="Bold">
          <Toggle.Context>{(api) => <span>{api().pressed ? "pressed" : "released"}</span>}</Toggle.Context>
        </Toggle.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Press from outside" }))
  await expect.element(toggle()).toHaveAttribute("aria-pressed", "true")
  await expect.element(toggle()).toHaveTextContent(/^pressed$/)
})
