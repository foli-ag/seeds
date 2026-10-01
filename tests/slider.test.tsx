import { render } from "@solidjs/testing-library"
import { For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Slider } from "../src/slider/index.js"

function Basic(props: Slider.RootProps) {
  return (
    <Slider.Root {...props}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.ValueText />
      <Slider.Control style={{ width: "200px", height: "10px" }}>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <For each={props.defaultValue ?? [0]}>
          {(_, index) => (
            <Slider.Thumb index={index()}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          )}
        </For>
      </Slider.Control>
    </Slider.Root>
  )
}

const thumb = () => page.getByRole("slider", { name: "Volume" })

test("steps the value with the arrow keys and reports it", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic defaultValue={[20]} onValueChange={onValueChange} />)

  thumb().element().focus()
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "21")
  await expect.element(page.getByText("21")).toBeVisible()
  expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: [21] }))
})

test("sets the value from where the control is clicked", async () => {
  render(() => <Basic defaultValue={[0]} />)

  const control = document.querySelector<HTMLElement>('[data-scope="slider"][data-part="control"]')!
  await userEvent.click(control, { position: { x: 150, y: 5 } })
  await expect.element(thumb()).toHaveAttribute("aria-valuenow", "75")
})

test("submits each thumb's value with a form", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="price" defaultValue={[20, 80]} />
    </form>
  ))

  await expect.poll(() => new FormData(form).getAll("price[]")).toEqual(["20", "80"])
})
