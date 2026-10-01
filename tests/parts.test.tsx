// Behavior every part shares through the element factory, `mergeProps` and presence, checked once on Dialog
import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { Dialog } from "../src"

const content = () => document.querySelector<HTMLElement>('[data-scope="dialog"][data-part="content"]')

test("asChild renders the caller's element with the part's props merged in", async () => {
  render(() => (
    <Dialog.Root>
      <Dialog.Trigger class="trigger" asChild={(props) => <a {...props({ href: "#open", class: "link" })}>Open</a>} />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ))

  const link = page.getByRole("link", { name: "Open" })
  await expect.element(link).toHaveAttribute("href", "#open")
  await expect.element(link).toHaveAttribute("aria-haspopup", "dialog")
  await expect.element(link).toHaveClass("trigger", "link")

  await userEvent.click(link)
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
