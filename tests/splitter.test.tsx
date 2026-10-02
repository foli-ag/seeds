import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { createSplitterRegistry, Splitter, useSplitter } from "../src/splitter/index.js"

function Basic(props: Partial<Splitter.RootProps> & { disabled?: boolean }) {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]} style={{ width: "400px", height: "100px" }} {...props}>
      <Splitter.Panel id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" disabled={props.disabled} aria-label="Resize" style={{ width: "8px" }}>
        <Splitter.ResizeTrigger.Indicator />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b">B</Splitter.Panel>
    </Splitter.Root>
  )
}

/** Renders `ui` and waits for the frame on which zag first measures the roots of its splitters */
async function renderSplitter(ui: Parameters<typeof render>[0]) {
  render(ui)
  // zag 1.44 puts an uncontrolled splitter back to its defaultSize whenever it measures its root at the same size
  // along its axis, which it first does on the frame after mounting. A resize made before then would be undone.
  await new Promise(requestAnimationFrame)
  await new Promise(requestAnimationFrame)
}

const separator = (name = "Resize") => page.getByRole("separator", { name })
const part = (name: string) => document.querySelector<HTMLElement>(`[data-scope="splitter"][data-part="${name}"]`)!
/** The share of the width that panel `a` takes next to panel `b` */
const shareOfA = () => {
  const [a, b] = ["a", "b"].map(
    (id) => document.querySelector(`[data-part="panel"][data-id="${id}"]`)!.getBoundingClientRect().width,
  )
  return a! / (a! + b!)
}

/**
 * Drags `element` with the mouse by `dx` and `dy` pixels, from its center or from the point `from` inside it. With
 * `force`, the mouse goes through even if the element takes no pointer events.
 */
async function drag(
  element: Element,
  dx: number,
  dy = 0,
  { from, force = false }: { from?: { x: number; y: number }; force?: boolean } = {},
) {
  const { left, top, width, height } = element.getBoundingClientRect()
  const source = from ?? { x: width / 2, y: height / 2 }
  // Positions on the page's root element are viewport coordinates
  await userEvent.dragAndDrop(element, document.documentElement, {
    sourcePosition: source,
    targetPosition: { x: left + source.x + dx, y: top + source.y + dy },
    force,
  })
}

test("sizes the panels from defaultSize and exposes the split on a separator", async () => {
  await renderSplitter(() => <Basic defaultSize={[30, 70]} />)

  await expect.element(separator()).toHaveAttribute("aria-valuenow", "30")
  await expect.element(separator()).toHaveAttribute("aria-valuemin", "0")
  await expect.element(separator()).toHaveAttribute("aria-valuemax", "100")
  await expect.element(separator()).toHaveAttribute("aria-orientation", "horizontal")
  expect(shareOfA()).toBeCloseTo(0.3, 2)
})

test("moves the split by keyboardResizeBy with the arrow keys", async () => {
  await renderSplitter(() => <Basic defaultSize={[30, 70]} keyboardResizeBy={5} />)

  separator().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "35")
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "25")
  expect(shareOfA()).toBeCloseTo(0.25, 2)
})

test("resizes the panels when the separator is dragged, reporting the sizes on the way and at the end", async () => {
  const onResize = vi.fn()
  const onResizeEnd = vi.fn()
  await renderSplitter(() => <Basic defaultSize={[30, 70]} onResize={onResize} onResizeEnd={onResizeEnd} />)

  // 40px of a 400px root
  await drag(part("resize-trigger"), 40)
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "40")
  expect(shareOfA()).toBeCloseTo(0.4, 2)
  expect(onResize).toHaveBeenLastCalledWith(expect.objectContaining({ resizeTriggerId: "a:b" }))
  await expect.poll(() => onResizeEnd).toHaveBeenCalledOnce()
  expect(onResizeEnd.mock.calls[0]![0].size[0]).toBeCloseTo(40, 0)
})

test("keeps a panel within its minSize and maxSize", async () => {
  await renderSplitter(() => (
    <Basic panels={[{ id: "a", minSize: 20, maxSize: 60 }, { id: "b" }]} defaultSize={[30, 70]} />
  ))

  await expect.element(separator()).toHaveAttribute("aria-valuemin", "20")
  await expect.element(separator()).toHaveAttribute("aria-valuemax", "60")
  separator().element().focus()
  await userEvent.keyboard("{End}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "60")
  await userEvent.keyboard("{Home}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "20")
  // 200px of a 400px root, from 20% to past 60%
  await drag(part("resize-trigger"), 200)
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "60")
})

test("collapses and expands a collapsible panel with Enter", async () => {
  await renderSplitter(() => (
    <Basic panels={[{ id: "a", collapsible: true, minSize: 20 }, { id: "b" }]} defaultSize={[30, 70]} />
  ))

  separator().element().focus()
  await userEvent.keyboard("{Enter}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "0")
  expect(shareOfA()).toBe(0)
  await userEvent.keyboard("{Enter}")
  await expect.poll(() => Number(separator().element().getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(20)
})

test("leaves a disabled trigger out of the tab order and takes no drag on it", async () => {
  await renderSplitter(() => <Basic defaultSize={[30, 70]} disabled />)

  await expect.element(part("resize-trigger-indicator")).toHaveAttribute("data-disabled")
  await userEvent.tab()
  await expect.element(separator()).not.toHaveFocus()
  await drag(part("resize-trigger"), 40, 0, { force: true })
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "30")
})

test("follows a controlled size, which changes only through onResize", async () => {
  function Controlled() {
    const [size, setSize] = createSignal<Splitter.PanelSize[]>([50, 50])
    return (
      <>
        <button type="button" onClick={() => setSize([20, 80])}>
          Narrow
        </button>
        <Basic size={size()} onResize={(details) => setSize(details.size)} />
      </>
    )
  }
  await renderSplitter(() => <Controlled />)

  await expect.element(separator()).toHaveAttribute("aria-valuenow", "50")
  separator().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "51")

  await userEvent.click(page.getByRole("button", { name: "Narrow" }))
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "20")
})

test("RootProvider renders a splitter driven from outside through useSplitter", async () => {
  function External() {
    const api = useSplitter({ panels: [{ id: "a", collapsible: true }, { id: "b" }], defaultSize: [40, 60] })
    return (
      <>
        <button type="button" onClick={() => api().collapsePanel("a")}>
          Collapse
        </button>
        <button type="button" onClick={() => api().expandPanel("a")}>
          Expand
        </button>
        <Splitter.RootProvider value={api} style={{ width: "400px", height: "100px" }}>
          <Splitter.Panel id="a">
            <Splitter.Context>
              {(api) => <p>{api().isPanelCollapsed("a") ? "collapsed" : "expanded"}</p>}
            </Splitter.Context>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
          <Splitter.Panel id="b">B</Splitter.Panel>
        </Splitter.RootProvider>
      </>
    )
  }
  await renderSplitter(() => <External />)

  await expect.element(separator()).toHaveAttribute("aria-valuenow", "40")
  await userEvent.click(page.getByRole("button", { name: "Collapse" }))
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "0")
  await expect.element(page.getByText("collapsed")).toBeInTheDocument()
  // Expanding brings the panel back to the size it had before it collapsed
  await userEvent.click(page.getByRole("button", { name: "Expand" }))
  await expect.element(separator()).toHaveAttribute("aria-valuenow", "40")
  await expect.element(page.getByText("expanded")).toBeInTheDocument()
})

test("drags the splitters that share a registry together from where their triggers meet", async () => {
  const registry = createSplitterRegistry()
  // Moving the columns resizes the inner root across its axis, which puts an uncontrolled splitter back to its
  // defaultSize in zag 1.44 (see renderSplitter), so the inner one is controlled
  const [rows, setRows] = createSignal<Splitter.PanelSize[]>([50, 50])
  await renderSplitter(() => (
    <Splitter.Root
      registry={registry}
      panels={[{ id: "left" }, { id: "right" }]}
      style={{ width: "400px", height: "400px" }}
    >
      <Splitter.Panel id="left">Left</Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Columns" style={{ width: "8px" }} />
      <Splitter.Panel id="right">
        <Splitter.Root
          registry={registry}
          orientation="vertical"
          panels={[{ id: "top" }, { id: "bottom" }]}
          size={rows()}
          onResize={(details) => setRows(details.size)}
        >
          <Splitter.Panel id="top">Top</Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Rows" style={{ height: "8px" }} />
          <Splitter.Panel id="bottom">Bottom</Splitter.Panel>
        </Splitter.Root>
      </Splitter.Panel>
    </Splitter.Root>
  ))

  // From the left end of the row trigger, against the column trigger, 40px left and 40px down in 400px roots
  const trigger = separator("Rows").element()
  await drag(trigger, -40, 40, { from: { x: 1, y: trigger.getBoundingClientRect().height / 2 } })
  await expect.element(separator("Columns")).toHaveAttribute("aria-valuenow", "40")
  await expect.element(separator("Rows")).toHaveAttribute("aria-valuenow", "60")
})

test("leaves the form around it alone when Space is pressed on the separator", async () => {
  const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
  await renderSplitter(() => (
    <form onSubmit={onSubmit}>
      <Basic />
    </form>
  ))

  separator().element().focus()
  await userEvent.keyboard(" ")
  expect(onSubmit).not.toHaveBeenCalled()
})
