import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Tooltip, useTooltip } from "../src/tooltip/index.js"

function Basic(props: Tooltip.RootProps) {
  // Away from the viewport's edges, which push the content back in
  return (
    <div style={{ padding: "100px" }}>
      <Tooltip.Root {...props}>
        <Tooltip.Trigger>Copy</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.Arrow.Tip />
            </Tooltip.Arrow>
            Copy to clipboard
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </div>
  )
}

const trigger = () => page.getByRole("button", { name: "Copy" })
const tooltip = () => page.getByRole("tooltip")
const content = () => document.querySelector('[data-scope="tooltip"][data-part="content"]')

// While a tooltip is open, zag opens the next one without waiting, so this test runs before any other opens one
test("opens on hover after openDelay, describes the trigger, and closes when the pointer leaves", async () => {
  // Longer than zag's default of 400ms, so it fails if the delay does not reach the machine
  const openDelay = 700
  let openedAt = 0
  const onOpenChange = ({ open }: Tooltip.OpenChangeDetails) => {
    if (open) openedAt = performance.now()
  }
  render(() => <Basic openDelay={openDelay} onOpenChange={onOpenChange} />)
  let hoveredAt = 0
  trigger()
    .element()
    .addEventListener("pointerenter", () => (hoveredAt = performance.now()))

  await userEvent.hover(trigger())
  await expect.element(tooltip()).toHaveTextContent("Copy to clipboard")
  await expect.element(trigger()).toHaveAccessibleDescription("Copy to clipboard")
  // A little under openDelay for timer jitter
  expect(openedAt - hoveredAt).toBeGreaterThan(openDelay - 100)

  await userEvent.unhover(trigger())
  await expect.element(tooltip()).not.toBeInTheDocument()
  await expect.element(trigger()).not.toHaveAccessibleDescription("Copy to clipboard")
})

test("opens on keyboard focus and closes on Escape", async () => {
  render(() => <Basic />)

  await userEvent.tab()
  await expect.element(trigger()).toHaveFocus()
  await expect.element(tooltip()).toHaveTextContent("Copy to clipboard")

  await userEvent.keyboard("{Escape}")
  await expect.element(tooltip()).not.toBeInTheDocument()
})

test("reports changes and follows `open` when controlled", async () => {
  const [open, setOpen] = createSignal(false)
  const onOpenChange = vi.fn()
  render(() => <Basic open={open()} onOpenChange={onOpenChange} />)

  setOpen(true)
  await expect.element(tooltip()).toBeVisible()

  await userEvent.keyboard("{Escape}")
  await expect.poll(() => onOpenChange).toHaveBeenCalledWith({ open: false })
  await expect.element(tooltip()).toBeVisible()

  setOpen(false)
  await expect.element(tooltip()).not.toBeInTheDocument()
})

test("places the content next to the trigger", async () => {
  render(() => <Basic defaultOpen positioning={{ placement: "right", gutter: 8 }} />)

  await expect.element(tooltip()).toBeVisible()
  const anchor = trigger().element().getBoundingClientRect()
  await expect
    .poll(() => Math.round(tooltip().element().getBoundingClientRect().left))
    .toBe(Math.round(anchor.right + 8))
})

test("mounts content on first open with lazyMount and drops it on close with unmountOnExit", async () => {
  render(() => <Basic lazyMount unmountOnExit />)

  expect(content()).toBeNull()

  await userEvent.tab()
  await expect.poll(content).not.toBeNull()

  await userEvent.keyboard("{Escape}")
  await expect.poll(content).toBeNull()
})

test("RootProvider renders a tooltip driven from outside through useTooltip", async () => {
  function External() {
    const api = useTooltip()
    return (
      <>
        <button type="button" onClick={() => api().setOpen(true)}>
          Show hint
        </button>
        <Tooltip.RootProvider value={api}>
          <Tooltip.Trigger>Copy</Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>
              <Tooltip.Context>{(api) => <span>{api().open ? "is open" : "is closed"}</span>}</Tooltip.Context>
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Show hint" }))
  await expect.element(tooltip()).toHaveTextContent("is open")
  await expect.element(trigger()).toHaveAccessibleDescription("is open")
})
