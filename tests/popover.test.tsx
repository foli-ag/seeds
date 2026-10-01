import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { Popover } from "../src/popover/index.js"

function Basic(props: Popover.RootProps) {
  // Away from the viewport's edges, which push the content back in
  return (
    <div style={{ padding: "100px" }}>
      <Popover.Root {...props}>
        <Popover.Trigger>Share</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow>
              <Popover.Arrow.Tip />
            </Popover.Arrow>
            <Popover.Title>Share link</Popover.Title>
            <Popover.Description>Anyone with the link can view</Popover.Description>
            <Popover.Trigger.Close>Done</Popover.Trigger.Close>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
      <button type="button" style={{ position: "fixed", bottom: 0, right: 0 }}>
        Outside
      </button>
    </div>
  )
}

const trigger = () => page.getByRole("button", { name: "Share" })
const popover = () => page.getByRole("dialog", { name: "Share link" })

test("opens from the trigger and closes on Escape", async () => {
  const onOpenChange = vi.fn()
  render(() => <Basic onOpenChange={onOpenChange} />)

  await userEvent.click(trigger())
  await expect.element(popover()).toHaveAccessibleDescription("Anyone with the link can view")
  expect(onOpenChange).toHaveBeenCalledWith({ open: true })

  await userEvent.keyboard("{Escape}")
  await expect.element(popover()).not.toBeInTheDocument()
  await expect.element(trigger()).toHaveFocus()
})

test("closes on a click outside and from Trigger.Close", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger())
  await userEvent.click(page.getByRole("button", { name: "Outside" }))
  await expect.element(popover()).not.toBeInTheDocument()

  await userEvent.click(trigger())
  // zag labels the close trigger with `translations.closeTriggerLabel`, "close" by default, whatever its text
  await userEvent.click(page.getByRole("button", { name: "close" }))
  await expect.element(popover()).not.toBeInTheDocument()
})

test("places the content next to the trigger", async () => {
  render(() => <Basic positioning={{ placement: "right-start", gutter: 8 }} />)

  await userEvent.click(trigger())
  await expect.element(popover()).toBeVisible()
  const anchor = trigger().element().getBoundingClientRect()
  await expect
    .poll(() => Math.round(popover().element().getBoundingClientRect().left))
    .toBe(Math.round(anchor.right + 8))
  expect(Math.round(popover().element().getBoundingClientRect().top)).toBe(Math.round(anchor.top))
})
