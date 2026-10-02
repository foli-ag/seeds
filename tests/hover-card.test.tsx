import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { HoverCard, useHoverCard } from "../src/hover-card/index.js"

const openDelay = 200
const closeDelay = 100

function Basic(props: HoverCard.RootProps) {
  // Away from the viewport's edges, which push the content back in
  return (
    <div style={{ padding: "100px" }}>
      <HoverCard.Root openDelay={openDelay} closeDelay={closeDelay} {...props}>
        <HoverCard.Trigger as="a" href="#foli-ag">
          @foli-ag
        </HoverCard.Trigger>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.Arrow.Tip />
            </HoverCard.Arrow>
            <p>Solid components on Zag.js</p>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>
      <button type="button" style={{ position: "fixed", bottom: 0, right: 0 }}>
        Outside
      </button>
    </div>
  )
}

const trigger = () => page.getByRole("link", { name: "@foli-ag" })
const card = () => page.getByText("Solid components on Zag.js")
const outside = () => page.getByRole("button", { name: "Outside" })

test("opens once the pointer has rested on the trigger for openDelay and closes after it leaves", async () => {
  const onOpenChange = vi.fn()
  render(() => <Basic onOpenChange={onOpenChange} />)

  const start = performance.now()
  await userEvent.hover(trigger())
  await expect.element(card()).toBeVisible()
  expect(performance.now() - start).toBeGreaterThanOrEqual(openDelay)
  expect(onOpenChange).toHaveBeenCalledWith({ open: true })

  await userEvent.hover(outside())
  await expect.element(card()).not.toBeVisible()
  expect(onOpenChange).toHaveBeenLastCalledWith({ open: false })
})

test("stays open while the pointer moves from the trigger onto the content", async () => {
  render(() => <Basic />)

  await userEvent.hover(trigger())
  await expect.element(card()).toBeVisible()

  await userEvent.hover(card())
  // Leaving the trigger started the close delay, which entering the content cancels
  await new Promise((resolve) => setTimeout(resolve, closeDelay * 3))
  await expect.element(card()).toBeVisible()

  await userEvent.hover(outside())
  await expect.element(card()).not.toBeVisible()
})

test("opens while the trigger has keyboard focus", async () => {
  render(() => <Basic />)

  trigger().element().focus()
  await expect.element(card()).toBeVisible()

  await userEvent.tab()
  await expect.element(outside()).toHaveFocus()
  await expect.element(card()).not.toBeVisible()
})

test("reports changes and follows `open` when controlled", async () => {
  const [open, setOpen] = createSignal(false)
  const onOpenChange = vi.fn()
  render(() => <Basic open={open()} onOpenChange={onOpenChange} />)

  await userEvent.hover(trigger())
  await expect.poll(() => onOpenChange).toHaveBeenCalledWith({ open: true })
  await expect.element(card()).not.toBeVisible()

  setOpen(true)
  await expect.element(card()).toBeVisible()

  await userEvent.hover(outside())
  await expect.poll(() => onOpenChange).toHaveBeenLastCalledWith({ open: false })
  await expect.element(card()).toBeVisible()

  setOpen(false)
  await expect.element(card()).not.toBeVisible()
})

test("places the content next to the trigger", async () => {
  render(() => <Basic defaultOpen positioning={{ placement: "right-start", gutter: 8 }} />)

  const positioner = () => document.querySelector<HTMLElement>('[data-scope="hover-card"][data-part="positioner"]')!
  await expect.element(card()).toBeVisible()
  const anchor = trigger().element().getBoundingClientRect()
  await expect.poll(() => Math.round(positioner().getBoundingClientRect().left)).toBe(Math.round(anchor.right + 8))
  expect(Math.round(positioner().getBoundingClientRect().top)).toBe(Math.round(anchor.top))
})

test("RootProvider renders a hover card driven from outside through useHoverCard", async () => {
  function External() {
    const api = useHoverCard({ openDelay: 0 })
    return (
      <>
        <button type="button" onClick={() => api().setOpen(true)}>
          Open from outside
        </button>
        <HoverCard.RootProvider value={api}>
          <HoverCard.Trigger>Profile</HoverCard.Trigger>
          <HoverCard.Positioner>
            <HoverCard.Content>
              <HoverCard.Context>{(api) => <p>{api().open ? "is open" : "is closed"}</p>}</HoverCard.Context>
            </HoverCard.Content>
          </HoverCard.Positioner>
        </HoverCard.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Open from outside" }))
  await expect.element(page.getByText("is open")).toBeVisible()
})
