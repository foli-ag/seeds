// Behavior every part shares through the element factory, `mergeProps` and presence, checked once on Dialog
import { render } from "@solidjs/testing-library"
import type { JSX } from "@solidjs/web"
import { page, userEvent } from "vitest/browser"
import { Dialog } from "../src/dialog/index.js"

function Button(props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & { variant: "ghost" | "solid" }) {
  return <button {...props} data-variant={props.variant} />
}

const content = () => document.querySelector<HTMLElement>('[data-scope="dialog"][data-part="content"]')

test("as renders a component with the part's props", async () => {
  render(() => (
    <Dialog.Root>
      <Dialog.Trigger as={Button} variant="ghost" class="trigger">
        Open
      </Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ))

  const trigger = page.getByRole("button", { name: "Open" })
  await expect.element(trigger).toHaveAttribute("data-variant", "ghost")
  await expect.element(trigger).toHaveAttribute("aria-haspopup", "dialog")
  await expect.element(trigger).toHaveClass("trigger")

  await userEvent.click(trigger)
  await expect.element(page.getByRole("dialog")).toBeVisible()
})

test("runs the caller's handlers along with the part's", async () => {
  const onClick = vi.fn()
  render(() => (
    <Dialog.Root>
      <Dialog.Trigger onClick={onClick}>Open</Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ))

  await userEvent.click(page.getByRole("button", { name: "Open" }))
  expect(onClick).toHaveBeenCalledOnce()
  await expect.element(page.getByRole("dialog")).toBeVisible()
})

test("passes the element to the caller's ref and lets the exit animation finish before unmounting", async () => {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fade-out { to { opacity: 0 } }
    [data-part="content"][data-state="closed"] { animation: fade-out 200ms }
  `
  document.head.append(style)
  onTestFinished(() => style.remove())

  let ref: HTMLElement | undefined
  render(() => (
    <Dialog.Root defaultOpen unmountOnExit>
      <Dialog.Positioner>
        <Dialog.Content ref={(el) => (ref = el)}>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Trigger.Close>Close</Dialog.Trigger.Close>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ))

  await expect.poll(content).not.toBeNull()
  expect(ref).toBe(content())

  await userEvent.click(page.getByRole("button", { name: "Close" }))
  // Presence holds the closing content in the DOM until its animation ends, which it can only do with the element
  await expect.poll(() => content()?.dataset.state).toBe("closed")
  await expect.poll(content).toBeNull()
})

// `as` types a part's props after the tag or component it renders
;() => <Dialog.Trigger as="a" href="#" />
// @ts-expect-error variant belongs to Button
;() => <Dialog.Trigger variant="ghost" />
// @ts-expect-error Button requires variant
;() => <Dialog.Trigger as={Button} />
