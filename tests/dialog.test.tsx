import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Dialog, useDialog } from "../src"

function Basic(props: Dialog.RootProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Delete file</Dialog.Title>
          <Dialog.Description>This cannot be undone</Dialog.Description>
          <input aria-label="Reason" />
          <Dialog.Trigger.Close>Close</Dialog.Trigger.Close>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

const trigger = () => page.getByRole("button", { name: "Open" })
const dialog = () => page.getByRole("dialog")
const content = () => document.querySelector('[data-scope="dialog"][data-part="content"]')

test("opens from the trigger, moves focus inside, and closes on Escape", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger())
  await expect
    .element(page.getByRole("dialog", { name: "Delete file" }))
    .toHaveAccessibleDescription("This cannot be undone")
  await expect.poll(() => dialog().element().contains(document.activeElement)).toBe(true)

  await userEvent.keyboard("{Escape}")
  await expect.element(dialog()).not.toBeInTheDocument()
  await expect.element(trigger()).toHaveFocus()
})

test("closes from Trigger.Close", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger())
  await userEvent.click(page.getByRole("button", { name: "Close" }))
  await expect.element(dialog()).not.toBeInTheDocument()
})

test("reports changes and follows `open` when controlled", async () => {
  const [open, setOpen] = createSignal(false)
  const onOpenChange = vi.fn()
  render(() => <Basic open={open()} onOpenChange={onOpenChange} />)

  await userEvent.click(trigger())
  await expect.poll(() => onOpenChange).toHaveBeenCalledWith({ open: true })
  expect(dialog().query()).toBeNull()

  setOpen(true)
  await expect.element(dialog()).toBeVisible()
})

test("renders an alert dialog", async () => {
  render(() => <Basic role="alertdialog" defaultOpen />)

  await expect.element(page.getByRole("alertdialog", { name: "Delete file" })).toBeVisible()
})

test("keeps closed content mounted and hidden by default", async () => {
  render(() => <Basic />)

  await expect.poll(content).toHaveAttribute("hidden")
  await expect.element(trigger()).toHaveAttribute("aria-controls", content()!.id)
})

test("mounts content on first open with lazyMount and drops it on close with unmountOnExit", async () => {
  render(() => <Basic lazyMount unmountOnExit />)

  expect(content()).toBeNull()
  await expect.element(trigger()).not.toHaveAttribute("aria-controls")

  await userEvent.click(trigger())
  await expect.poll(content).not.toBeNull()

  await userEvent.click(page.getByRole("button", { name: "Close" }))
  await expect.poll(content).toBeNull()
})

test("RootProvider renders a dialog driven from outside through useDialog", async () => {
  function External() {
    const api = useDialog()
    return (
      <>
        <button type="button" onClick={() => api().setOpen(true)}>
          Open from outside
        </button>
        <Dialog.RootProvider value={api}>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Driven</Dialog.Title>
              <Dialog.Context>{(api) => <p>{api().open ? "is open" : "is closed"}</p>}</Dialog.Context>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Open from outside" }))
  await expect.element(page.getByRole("dialog", { name: "Driven" })).toHaveTextContent("is open")
})
