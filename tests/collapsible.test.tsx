import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { Collapsible } from "../src/collapsible/index.js"

function Basic(props: Collapsible.RootProps) {
  return (
    <Collapsible.Root {...props}>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Content>Shipping takes three days</Collapsible.Content>
    </Collapsible.Root>
  )
}

const trigger = () => page.getByRole("button", { name: "Details" })
const content = () => document.querySelector('[data-scope="collapsible"][data-part="content"]')

test("expands and collapses from the trigger", async () => {
  const onOpenChange = vi.fn()
  render(() => <Basic onOpenChange={onOpenChange} />)

  await expect.element(page.getByText("Shipping takes three days")).not.toBeVisible()
  await userEvent.click(trigger())
  await expect.element(page.getByText("Shipping takes three days")).toBeVisible()
  await expect.element(trigger()).toHaveAttribute("aria-expanded", "true")
  expect(onOpenChange).toHaveBeenCalledWith({ open: true })

  await userEvent.click(trigger())
  await expect.element(page.getByText("Shipping takes three days")).not.toBeVisible()
})

test("mounts content on first open with lazyMount and drops it on close with unmountOnExit", async () => {
  render(() => <Basic lazyMount unmountOnExit />)

  expect(content()).toBeNull()
  await expect.element(trigger()).not.toHaveAttribute("aria-controls")

  await userEvent.click(trigger())
  await expect.poll(content).not.toBeNull()
  await expect.element(trigger()).toHaveAttribute("aria-controls", content()!.id)

  await userEvent.click(trigger())
  await expect.poll(content).toBeNull()
})
