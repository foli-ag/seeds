import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Progress, useProgress } from "../src/progress/index.js"

function Linear(props: Progress.RootProps) {
  return (
    <Progress.Root {...props}>
      <Progress.Label>Uploading</Progress.Label>
      <Progress.ValueText />
      <Progress.Track style={{ width: "200px", height: "8px" }}>
        <Progress.Range style={{ height: "100%" }} />
      </Progress.Track>
      <Progress.View state="indeterminate">Starting</Progress.View>
      <Progress.View state="complete">Done</Progress.View>
    </Progress.Root>
  )
}

const bar = () => page.getByRole("progressbar")
const range = () => document.querySelector<HTMLElement>('[data-scope="progress"][data-part="range"]')!
const valueText = () => document.querySelector<HTMLElement>('[data-scope="progress"][data-part="value-text"]')!

test("exposes the value as a progressbar and fills the track by its share", async () => {
  render(() => <Linear defaultValue={25} />)

  await expect.element(page.getByText("Uploading")).toBeVisible()
  await expect.element(page.getByRole("progressbar", { name: "25%" })).toBeVisible()
  await expect.element(bar()).toHaveAttribute("aria-valuenow", "25")
  await expect.element(bar()).toHaveAttribute("aria-valuemin", "0")
  await expect.element(bar()).toHaveAttribute("aria-valuemax", "100")
  await expect.element(valueText()).toHaveTextContent("25%")
  expect(range().getBoundingClientRect().width).toBe(50)
})

test.each([
  { name: "a share of min and max", props: { min: 0, max: 4, defaultValue: 3 }, text: "75%" },
  {
    name: "formatOptions",
    props: { max: 500, defaultValue: 120, formatOptions: { style: "unit", unit: "megabyte" } },
    text: "120 MB",
  },
  {
    name: "translations.value",
    props: { defaultValue: 40, translations: { value: ({ value }) => `${value} of 100 files` } },
    text: "40 of 100 files",
  },
] satisfies { name: string; props: Progress.RootProps; text: string }[])(
  "formats the value text from $name",
  async ({ props, text }) => {
    render(() => <Linear {...props} />)

    await expect.element(valueText()).toHaveTextContent(text)
    await expect.element(page.getByRole("progressbar", { name: text })).toBeVisible()
  },
)

test("is indeterminate when the value is null", async () => {
  render(() => <Linear value={null} />)

  await expect.element(bar()).not.toHaveAttribute("aria-valuenow")
  await expect.element(page.getByText("Starting")).toBeVisible()
  await expect.element(page.getByText("Done")).not.toBeVisible()
  await expect.element(valueText()).toBeEmptyDOMElement()
})

test("follows a controlled value, from indeterminate to complete", async () => {
  const [value, setValue] = createSignal<number | null>(null)
  render(() => <Linear value={value()} />)

  await expect.element(page.getByText("Starting")).toBeVisible()

  setValue(60)
  await expect.element(bar()).toHaveAttribute("aria-valuenow", "60")
  await expect.element(valueText()).toHaveTextContent("60%")
  await expect.element(page.getByText("Starting")).not.toBeVisible()

  setValue(100)
  await expect.element(bar()).toHaveAttribute("aria-valuenow", "100")
  await expect.element(page.getByText("Done")).toBeVisible()
})

test("draws the circle as an SVG progressbar whose arc covers the value's share", async () => {
  render(() => (
    <Progress.Root defaultValue={25} style={{ "--size": "100px", "--thickness": "10px" }}>
      <Progress.Circle>
        <Progress.Circle.Track />
        <Progress.Circle.Range />
      </Progress.Circle>
    </Progress.Root>
  ))

  await expect.element(page.getByRole("progressbar", { name: "25%" })).toHaveAttribute("aria-valuenow", "25")
  const [track, arc] = document.querySelectorAll<SVGCircleElement>('[data-scope="progress"] circle')
  // Circles created outside the SVG namespace would not render at all
  await expect.element(track!).toBeVisible()
  await expect.element(arc!).toBeVisible()
  const { strokeDasharray, strokeDashoffset } = getComputedStyle(arc!)
  expect(1 - parseFloat(strokeDashoffset) / parseFloat(strokeDasharray)).toBeCloseTo(0.25)
})

test("RootProvider renders a progress driven from outside through useProgress", async () => {
  function External() {
    const api = useProgress({ defaultValue: 10 })
    return (
      <>
        <button type="button" onClick={() => api().setToMax()}>
          Finish
        </button>
        <Progress.RootProvider value={api}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
          <Progress.Context>{(api) => <p>{api().percent} percent</p>}</Progress.Context>
        </Progress.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await expect.element(bar()).toHaveAttribute("aria-valuenow", "10")
  await userEvent.click(page.getByRole("button", { name: "Finish" }))
  await expect.element(bar()).toHaveAttribute("aria-valuenow", "100")
  await expect.element(page.getByText("100 percent")).toBeVisible()
})
