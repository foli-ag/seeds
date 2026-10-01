import { render } from "@solidjs/testing-library"
import { For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { RadioGroup } from "../src/radio-group/index.js"

function Basic(props: RadioGroup.RootProps) {
  return (
    <RadioGroup.Root {...props}>
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <For each={["Free", "Pro"]}>
        {(plan) => (
          <RadioGroup.Item value={plan.toLowerCase()}>
            <RadioGroup.Item.Control />
            <RadioGroup.Item.Text>{plan}</RadioGroup.Item.Text>
            <RadioGroup.Item.HiddenInput />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup.Root>
  )
}

const radio = (name: string) => page.getByRole("radio", { name })

test("checks the clicked item and reports the value", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await expect.element(page.getByRole("radiogroup", { name: "Plan" })).toBeVisible()
  await userEvent.click(page.getByText("Pro"))
  await expect.element(radio("Pro")).toBeChecked()
  expect(onValueChange).toHaveBeenCalledWith({ value: "pro" })
})

test("moves the selection with the arrow keys", async () => {
  render(() => <Basic defaultValue="free" />)

  await userEvent.click(page.getByText("Free"))
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(radio("Pro")).toBeChecked()
  await expect.element(radio("Free")).not.toBeChecked()
})

test("submits the checked value with a form", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="plan" />
    </form>
  ))

  await userEvent.click(page.getByText("Pro"))
  await expect.poll(() => new FormData(form).get("plan")).toBe("pro")
})
