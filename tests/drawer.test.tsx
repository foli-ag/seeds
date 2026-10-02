import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { Drawer, useDrawer } from "../src/drawer/index.js"

function Basic(props: Drawer.RootProps & { draggable?: boolean }) {
  return (
    <Drawer.Root {...props}>
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content draggable={props.draggable}>
          <Drawer.Grabber>
            <Drawer.Grabber.Indicator />
          </Drawer.Grabber>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Description>Narrow the list down</Drawer.Description>
          <Drawer.Trigger.Close>Close</Drawer.Trigger.Close>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

const trigger = () => page.getByRole("button", { name: "Open" })
const drawer = () => page.getByRole("dialog")
const part = (name: string) => document.querySelector<HTMLElement>(`[data-scope="drawer"][data-part="${name}"]`)!

/** Drags `element` by `dy` pixels with a touch pointer, which zag follows from the first move */
function swipe(element: HTMLElement, dy: number) {
  const { left, top } = element.getBoundingClientRect()
  const init = { bubbles: true, pointerId: 1, pointerType: "touch", isPrimary: true, clientX: left + 4, button: 0 }
  element.dispatchEvent(new PointerEvent("pointerdown", { ...init, clientY: top + 4, buttons: 1 }))
  for (let step = 1; step <= 10; step++) {
    element.dispatchEvent(new PointerEvent("pointermove", { ...init, clientY: top + 4 + (dy * step) / 10, buttons: 1 }))
  }
  element.dispatchEvent(new PointerEvent("pointerup", { ...init, clientY: top + 4 + dy }))
}

test("opens from the trigger as a dialog and closes on Escape", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger())
  await expect
    .element(page.getByRole("dialog", { name: "Filters" }))
    .toHaveAccessibleDescription("Narrow the list down")

  await userEvent.keyboard("{Escape}")
  await expect.element(drawer()).not.toBeInTheDocument()
  await expect.element(trigger()).toHaveFocus()
  // The drawer only counts as closed once the content's presence reports the end of its exit
  await expect.poll(() => part("positioner")).toHaveAttribute("hidden")
})

test("closes from Trigger.Close", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger())
  await userEvent.click(page.getByRole("button", { name: "Close" }))
  await expect.element(drawer()).not.toBeInTheDocument()
})

test("closes when the content is swiped down", async () => {
  const onOpenChange = vi.fn()
  render(() => <Basic defaultOpen onOpenChange={onOpenChange} />)

  await expect.element(drawer()).toBeVisible()
  swipe(part("content"), 400)
  await expect.element(drawer()).not.toBeInTheDocument()
  expect(onOpenChange).toHaveBeenCalledWith({ open: false })
})

test("only drags from the grabber when the content is not draggable", async () => {
  render(() => <Basic defaultOpen draggable={false} />)

  await expect.element(drawer()).toBeVisible()
  swipe(part("content"), 400)
  await expect.element(drawer()).toBeVisible()

  swipe(part("grabber"), 400)
  await expect.element(drawer()).not.toBeInTheDocument()
})

test("marks the indent of its stack active while a drawer in it is open", async () => {
  render(() => (
    <Drawer.Stack>
      <Drawer.Indent.Background />
      <Drawer.Indent>
        <Basic />
      </Drawer.Indent>
    </Drawer.Stack>
  ))

  await expect.element(part("indent")).toHaveAttribute("data-inactive")
  await userEvent.click(trigger())
  await expect.element(part("indent")).toHaveAttribute("data-active")
  await expect.element(part("indent-background")).toHaveAttribute("data-active")

  await userEvent.keyboard("{Escape}")
  await expect.element(part("indent")).toHaveAttribute("data-inactive")
})

test("RootProvider renders a drawer driven from outside through useDrawer", async () => {
  function External() {
    const api = useDrawer()
    return (
      <>
        <button type="button" onClick={() => api().setOpen(true)}>
          Open from outside
        </button>
        <Drawer.RootProvider value={api}>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Title>Driven</Drawer.Title>
              <Drawer.Context>{(api) => <p>{api().open ? "is open" : "is closed"}</p>}</Drawer.Context>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Open from outside" }))
  await expect.element(page.getByRole("dialog", { name: "Driven" })).toHaveTextContent("is open")
})
