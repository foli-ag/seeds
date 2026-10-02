import { render } from "@solidjs/testing-library"
import { createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { RatingGroup, useRatingGroup } from "../src/rating-group/index.js"

/** Draws each item from its state: ★ highlighted, ½ half highlighted, ☆ not */
function Stars() {
  return (
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(api) => (
          <For each={api().items}>
            {(index) => (
              <RatingGroup.Item index={index}>
                <RatingGroup.Item.Context>
                  {(item) => <span>{item().half ? "½" : item().highlighted ? "★" : "☆"}</span>}
                </RatingGroup.Item.Context>
              </RatingGroup.Item>
            )}
          </For>
        )}
      </RatingGroup.Context>
    </RatingGroup.Control>
  )
}

function Basic(props: RatingGroup.RootProps) {
  return (
    <RatingGroup.Root {...props}>
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <Stars />
      <RatingGroup.HiddenInput />
    </RatingGroup.Root>
  )
}

const star = (n: number) => page.getByRole("radio", { name: `${n} stars` })
const control = () => page.getByRole("radiogroup", { name: "Rating" })
const label = () => page.getByText("Rating")

test("checks the clicked item, highlights the ones before it and reports the value", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await userEvent.click(star(3))
  await expect.element(star(3)).toBeChecked()
  await expect.element(control()).toHaveTextContent("★★★☆☆")
  expect(onValueChange).toHaveBeenCalledWith({ value: 3 })
})

test("highlights the items up to the pointer, and the value again once it leaves", async () => {
  render(() => <Basic defaultValue={2} />)

  // zag follows the pointer from its second move inside the control, so it comes in from the label
  await userEvent.hover(label())
  await userEvent.hover(star(1))
  await userEvent.hover(star(4))
  await expect.element(control()).toHaveTextContent("★★★★☆")

  await userEvent.hover(label())
  await expect.element(control()).toHaveTextContent("★★☆☆☆")
})

test("moves the rating with the arrow keys", async () => {
  render(() => <Basic defaultValue={2} />)

  await userEvent.tab()
  await expect.element(star(2)).toHaveFocus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(star(3)).toBeChecked()
  await expect.element(star(3)).toHaveFocus()

  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}")
  await expect.element(star(1)).toBeChecked()
  await expect.element(control()).toHaveTextContent("★☆☆☆☆")
})

test("rates by halves from the half of the item under the pointer when allowHalf is set", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic allowHalf onValueChange={onValueChange} />)
  const leftEdge = { position: { x: 1, y: 1 } }

  await userEvent.hover(label())
  await userEvent.hover(star(1))
  await userEvent.hover(star(3), leftEdge)
  await expect.element(control()).toHaveTextContent("★★½☆☆")

  await userEvent.click(star(3), leftEdge)
  expect(onValueChange).toHaveBeenCalledWith({ value: 2.5 })
  await expect.element(star(3)).toBeChecked()
})

test.each(["readOnly", "disabled"] as const)("keeps its value when %s", async (flag) => {
  const onValueChange = vi.fn()
  render(() => (
    <Basic
      defaultValue={2}
      readOnly={flag === "readOnly"}
      disabled={flag === "disabled"}
      onValueChange={onValueChange}
    />
  ))

  // Playwright waits for an element marked aria-disabled to be enabled before clicking it
  await userEvent.click(star(4), { force: true })
  await expect.element(star(2)).toBeChecked()
  await expect.element(control()).toHaveTextContent("★★☆☆☆")
  expect(onValueChange).not.toHaveBeenCalled()
})

test("submits the rating with a form, and goes back to defaultValue when the form resets", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="rating" defaultValue={2} />
    </form>
  ))

  await userEvent.click(star(4))
  await expect.poll(() => new FormData(form).get("rating")).toBe("4")

  form.reset()
  await expect.element(star(2)).toBeChecked()
  await expect.poll(() => new FormData(form).get("rating")).toBe("2")
})

test("follows `value` when controlled", async () => {
  const [value, setValue] = createSignal(2)
  render(() => <Basic value={value()} onValueChange={(details) => setValue(details.value)} />)

  await expect.element(star(2)).toBeChecked()
  await userEvent.click(star(4))
  expect(value()).toBe(4)

  setValue(1)
  await expect.element(star(1)).toBeChecked()
  await expect.element(control()).toHaveTextContent("★☆☆☆☆")
})

test("RootProvider renders a rating group driven from outside through useRatingGroup", async () => {
  function External() {
    const api = useRatingGroup({ count: 3 })
    return (
      <>
        <button type="button" onClick={() => api().setValue(2)}>
          Rate 2
        </button>
        <RatingGroup.RootProvider value={api}>
          <RatingGroup.Label>Rating</RatingGroup.Label>
          <Stars />
          <RatingGroup.Context>
            {(api) => (
              <p>
                {api().value} of {api().count}
              </p>
            )}
          </RatingGroup.Context>
        </RatingGroup.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Rate 2" }))
  await expect.element(star(2)).toBeChecked()
  await expect.element(control()).toHaveTextContent("★★☆")
  await expect.element(page.getByText("2 of 3")).toBeVisible()
})
