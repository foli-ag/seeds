import { render } from "@solidjs/testing-library"
import { createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Carousel, useCarousel } from "../src/carousel/index.js"

const crops = ["Wheat", "Barley", "Oats"]

function Slides() {
  return (
    <Carousel.Group>
      <For each={crops}>
        {(crop, index) => (
          <Carousel.Item index={index()} style={{ height: "100px" }}>
            {crop}
          </Carousel.Item>
        )}
      </For>
    </Carousel.Group>
  )
}

function Basic(props: Omit<Carousel.RootProps, "slideCount">) {
  return (
    <Carousel.Root slideCount={crops.length} style={{ width: "200px" }} {...props}>
      <Slides />
      <Carousel.Control>
        <Carousel.Trigger.Prev>‹</Carousel.Trigger.Prev>
        <Carousel.IndicatorGroup>
          <For each={crops}>{(_, index) => <Carousel.Indicator index={index()} />}</For>
        </Carousel.IndicatorGroup>
        <Carousel.Trigger.Next>›</Carousel.Trigger.Next>
        <Carousel.Trigger.Autoplay>
          <Carousel.AutoplayIndicator fallback="Paused">Playing</Carousel.AutoplayIndicator>
        </Carousel.Trigger.Autoplay>
        <Carousel.ProgressText />
      </Carousel.Control>
    </Carousel.Root>
  )
}

const prev = () => page.getByRole("button", { name: "Previous slide" })
const next = () => page.getByRole("button", { name: "Next slide" })
const indicator = (n: number) => page.getByRole("button", { name: `Go to slide ${n}` })
/** The slide numbered `n`, which is only in the accessibility tree while it is in view */
const slide = (n: number) => page.getByRole("group", { name: `${n} of ${crops.length}` })
const part = (name: string) => document.querySelector<HTMLElement>(`[data-scope="carousel"][data-part="${name}"]`)!

test("moves a page at a time with Trigger.Next and Trigger.Prev, which stop at the ends", async () => {
  const onPageChange = vi.fn()
  render(() => <Basic onPageChange={onPageChange} />)

  await expect.element(slide(1)).toHaveTextContent("Wheat")
  await expect.element(prev()).toBeDisabled()

  await userEvent.click(next())
  await expect.element(slide(2)).toHaveTextContent("Barley")
  await expect.element(slide(1)).not.toBeInTheDocument()
  await expect.element(page.getByText("2 / 3")).toBeVisible()
  expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 1 }))

  await userEvent.click(next())
  await expect.element(slide(3)).toHaveTextContent("Oats")
  await expect.element(next()).toBeDisabled()

  await userEvent.click(prev())
  await expect.element(slide(2)).toBeVisible()
})

test("goes to a page from its indicator, which is marked current", async () => {
  render(() => <Basic />)

  await expect.element(indicator(1)).toHaveAttribute("data-current")
  await userEvent.click(indicator(3))
  await expect.element(slide(3)).toBeVisible()
  await expect.element(indicator(3)).toHaveAttribute("data-current")
  await expect.element(indicator(1)).not.toHaveAttribute("data-current")
})

test("moves between pages with the arrow keys, Home and End from the indicators", async () => {
  render(() => <Basic />)

  indicator(1).element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(slide(2)).toBeVisible()
  await expect.element(indicator(2)).toHaveFocus()

  await userEvent.keyboard("{End}")
  await expect.element(slide(3)).toBeVisible()
  await expect.element(indicator(3)).toHaveFocus()

  await userEvent.keyboard("{Home}")
  await expect.element(slide(1)).toBeVisible()
})

test("moves between pages with the arrow keys while the slides have focus", async () => {
  render(() => <Basic />)

  await expect.element(slide(1)).toBeVisible()
  part("item-group").focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(slide(2)).toBeVisible()
  await userEvent.keyboard("{ArrowLeft}")
  await expect.element(slide(1)).toBeVisible()
})

test("is a region of slides described as a carousel", async () => {
  render(() => <Basic aria-label="Crops" />)

  await expect.element(page.getByRole("region", { name: "Crops" })).toHaveAttribute("aria-roledescription", "carousel")
  await expect.element(slide(1)).toHaveAttribute("aria-roledescription", "slide")
})

test("Trigger.Autoplay stops and restarts autoplay, which AutoplayIndicator follows", async () => {
  render(() => <Basic autoplay={{ delay: 200 }} />)

  await expect.element(page.getByText("Playing")).toBeVisible()
  await expect.element(slide(2)).toBeVisible()

  await userEvent.click(page.getByRole("button", { name: "Stop slide rotation" }))
  await expect.element(page.getByText("Paused")).toBeVisible()
  const stoppedAt = part("progress-text").textContent
  await new Promise((resolve) => setTimeout(resolve, 600))
  expect(part("progress-text").textContent).toBe(stoppedAt)

  await userEvent.click(page.getByRole("button", { name: "Start slide rotation" }))
  await expect.element(page.getByText("Playing")).toBeVisible()
  await expect.poll(() => part("progress-text").textContent).not.toBe(stoppedAt)
})

test("follows a controlled page", async () => {
  const [current, setCurrent] = createSignal(0)
  render(() => (
    <>
      <button type="button" onClick={() => setCurrent(2)}>
        Last
      </button>
      <Basic page={current()} onPageChange={(details) => setCurrent(details.page)} />
    </>
  ))

  await userEvent.click(page.getByRole("button", { name: "Last" }))
  await expect.element(slide(3)).toBeVisible()
  await expect.element(indicator(3)).toHaveAttribute("data-current")

  await userEvent.click(prev())
  await expect.poll(current).toBe(1)
  await expect.element(slide(2)).toBeVisible()
})

test("ProgressText words the page out of the total with translations.progressText", async () => {
  render(() => <Basic translations={{ progressText: ({ page, totalPages }) => `Slide ${page} of ${totalPages}` }} />)

  await expect.element(page.getByText("Slide 1 of 3")).toBeVisible()
})

test("RootProvider renders a carousel driven from outside through useCarousel", async () => {
  function External() {
    const api = useCarousel({ slideCount: crops.length })
    return (
      <>
        <button type="button" onClick={() => api().scrollNext()}>
          Forward
        </button>
        <Carousel.RootProvider value={api} style={{ width: "200px" }}>
          <Slides />
          <Carousel.Context>{(api) => <p>On page {api().page + 1}</p>}</Carousel.Context>
        </Carousel.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Forward" }))
  await expect.element(slide(2)).toBeVisible()
  await expect.element(page.getByText("On page 2")).toBeVisible()
})

// A carousel has nothing to open, so Trigger only groups Prev, Next and Autoplay
// @ts-expect-error Carousel.Trigger is not a component
;() => <Carousel.Trigger />
