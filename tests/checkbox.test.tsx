import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { Checkbox } from "../src/checkbox/index.js"

function Basic(props: Checkbox.RootProps) {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control>
        <Checkbox.Indicator>checked</Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>mixed</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Accept terms</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  )
}

const checkbox = () => page.getByRole("checkbox", { name: "Accept terms" })

test("toggles from a click on its label and reports the change", async () => {
  const onCheckedChange = vi.fn()
  render(() => <Basic onCheckedChange={onCheckedChange} />)

  await expect.element(checkbox()).not.toBeChecked()
  await userEvent.click(page.getByText("Accept terms"))
  await expect.element(checkbox()).toBeChecked()
  expect(onCheckedChange).toHaveBeenCalledWith({ checked: true })
})

test("shows the indicator that matches its state", async () => {
  render(() => <Basic defaultChecked="indeterminate" />)

  await expect.element(checkbox()).toBePartiallyChecked()
  await expect.element(page.getByText("mixed")).toBeVisible()
  await expect.element(page.getByText("checked")).not.toBeVisible()

  await userEvent.click(page.getByText("Accept terms"))
  await expect.element(page.getByText("checked")).toBeVisible()
  await expect.element(page.getByText("mixed")).not.toBeVisible()
})

test("submits its value with a form while checked", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="terms" value="accepted" />
    </form>
  ))

  expect(new FormData(form).get("terms")).toBeNull()
  await userEvent.click(page.getByText("Accept terms"))
  await expect.poll(() => new FormData(form).get("terms")).toBe("accepted")
})
