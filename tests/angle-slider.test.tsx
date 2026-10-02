import { render } from "@solidjs/testing-library"
import { createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { AngleSlider, useAngleSlider } from "../src/angle-slider/index.js"

/** A 200px dial whose thumb is a wide needle from the center up, turning around the center */
function Dial() {
  return (
    <AngleSlider.Control style={{ position: "relative", width: "200px", height: "200px" }}>
      <AngleSlider.Thumb
        style={{
          position: "absolute",
          left: "60px",
          top: "0",
          width: "80px",
          height: "100px",
          "transform-origin": "50% 100%",
        }}
      />
      <AngleSlider.MarkerGroup>
        <For each={[0, 90, 180]}>{(value) => <AngleSlider.Marker value={value} />}</For>
      </AngleSlider.MarkerGroup>
    </AngleSlider.Control>
  )
}

function Basic(props: AngleSlider.RootProps) {
  // The dial comes first so that it sits on whole pixels and the angles below are exact
  return (
    <AngleSlider.Root {...props}>
      <Dial />
      <AngleSlider.Label>Angle</AngleSlider.Label>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}

const thumb = () => page.getByRole("slider", { name: "Angle" })
const control = () => document.querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="control"]')!

type Point = [x: number, y: number]

/**
 * Presses `target` at the first point, moves through the others and releases, in pixels from the control's top left.
 * userEvent's pointer lands a hundredth of a pixel off in the scaled test iframe, and zag rounds an angle up to the
 * next step, so 270.01 degrees would read 271.
 */
async function drag(target: Element, [start, ...moves]: [Point, ...Point[]]) {
  const { left, top } = control().getBoundingClientRect()
  const at = ([x, y]: Point) => ({
    bubbles: true,
    pointerId: 1,
    pointerType: "mouse",
    isPrimary: true,
    button: 0,
    clientX: left + x,
    clientY: top + y,
  })
  target.dispatchEvent(new PointerEvent("pointerdown", { ...at(start), buttons: 1 }))
  // zag starts following the pointer on the document once the machine has handled the press
  await new Promise(requestAnimationFrame)
  for (const point of moves) target.dispatchEvent(new PointerEvent("pointermove", { ...at(point), buttons: 1 }))
  target.dispatchEvent(new PointerEvent("pointerup", at(moves.at(-1) ?? start)))
}

test("is a slider named by its label, which focuses it, with the angle in its aria values and value text", async () => {
  render(() => <Basic defaultValue={45} />)

  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "45")
  await expect.element(thumb()).toHaveAttribute("aria-valuemin", "0")
  await expect.element(thumb()).toHaveAttribute("aria-valuemax", "360")
  await expect.element(page.getByText("45deg")).toBeVisible()

  await userEvent.click(page.getByText("Angle"))
  await expect.element(thumb()).toHaveFocus()
})

test("sets the angle from where the control is pressed, 0 at the top and clockwise", async () => {
  const onValueChangeEnd = vi.fn()
  render(() => <Basic onValueChangeEnd={onValueChangeEnd} />)

  await drag(control(), [[190, 100]])
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "90")
  await expect.element(thumb()).toHaveFocus()
  expect(onValueChangeEnd).toHaveBeenLastCalledWith({ value: 90, valueAsDegree: "90deg" })

  await drag(control(), [[10, 100]])
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "270")
})

test("dragging the thumb turns it by the angle the pointer travels, from where it was grabbed", async () => {
  render(() => <Basic />)

  // Grabbed 45 degrees right of its axis and dragged to the bottom, at 180 degrees: it turns by 135, not to 180
  await drag(thumb().element(), [
    [130, 70],
    [190, 100],
    [100, 190],
  ])
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "135")
})

test("the arrow keys turn it by `step`", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic defaultValue={30} step={15} onValueChange={onValueChange} />)

  thumb().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "45")

  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}")
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "15")
  await expect.element(page.getByText("15deg")).toBeVisible()
  expect(onValueChange).toHaveBeenLastCalledWith({ value: 15, valueAsDegree: "15deg" })
})

test("marks each marker under, at or over the value", async () => {
  render(() => <Basic defaultValue={90} />)

  const states = () =>
    [...document.querySelectorAll('[data-scope="angle-slider"][data-part="marker"]')].map((marker) =>
      marker.getAttribute("data-state"),
    )
  await expect.poll(states).toEqual(["under-value", "at-value", "over-value"])
})

test("submits the angle with a form", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="angle" defaultValue={90} />
    </form>
  ))

  await expect.poll(() => new FormData(form).get("angle")).toBe("90")
  thumb().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.poll(() => new FormData(form).get("angle")).toBe("91")
})

test("follows `value` when controlled", async () => {
  const [value, setValue] = createSignal(45)
  render(() => <Basic value={value()} onValueChange={(details) => setValue(details.value)} />)

  thumb().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  expect(value()).toBe(46)

  setValue(180)
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "180")
  await expect.element(page.getByText("180deg")).toBeVisible()
})

test("RootProvider renders an angle slider driven from outside through useAngleSlider", async () => {
  function External() {
    const api = useAngleSlider({ "aria-label": "Heading" })
    return (
      <>
        <button type="button" onClick={() => api().setValue(270)}>
          Point west
        </button>
        <AngleSlider.RootProvider value={api}>
          <Dial />
          <AngleSlider.Context>{(api) => <p>Heading {api().valueAsDegree}</p>}</AngleSlider.Context>
        </AngleSlider.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Point west" }))
  await expect.element(page.getByRole("slider", { name: "Heading" })).toHaveAttribute("aria-valuenow", "270")
  await expect.element(page.getByText("Heading 270deg")).toBeVisible()
})
