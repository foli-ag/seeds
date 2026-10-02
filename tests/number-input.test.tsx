import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { NumberInput, useNumberInput } from "../src/number-input/index.js"

function Basic(props: NumberInput.RootProps) {
  return (
    <NumberInput.Root {...props}>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Trigger.Decrement>-</NumberInput.Trigger.Decrement>
        <NumberInput.Input />
        <NumberInput.Trigger.Increment>+</NumberInput.Trigger.Increment>
      </NumberInput.Control>
    </NumberInput.Root>
  )
}

const input = () => page.getByRole("spinbutton", { name: "Quantity" })
const increment = () => page.getByRole("button", { name: "increment value" })
const decrement = () => page.getByRole("button", { name: "decrease value" })

test("is a spin button labelled by its label, with the range and value in its aria attributes", async () => {
  render(() => <Basic min={0} max={10} defaultValue="4" />)

  await expect.element(input()).toHaveAttribute("aria-valuemin", "0")
  await expect.element(input()).toHaveAttribute("aria-valuemax", "10")
  await expect.element(input()).toHaveAttribute("aria-valuenow", "4")
  await expect.element(input()).toHaveValue("4")
})

test("takes a typed number and reports it", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await userEvent.type(input(), "42")
  await expect.element(input()).toHaveAttribute("aria-valuenow", "42")
  expect(onValueChange).toHaveBeenLastCalledWith({ value: "42", valueAsNumber: 42 })
})

test("keeps the decimal point while a decimal is edited", async () => {
  render(() => <Basic />)

  await userEvent.type(input(), "1.5{Backspace}")
  await expect.element(input()).toHaveValue("1.")
  await userEvent.keyboard("7")
  await expect.element(input()).toHaveValue("1.7")
})

test("steps the value by step with ArrowUp and ArrowDown", async () => {
  render(() => <Basic defaultValue="10" step={5} />)

  await userEvent.click(input())
  await userEvent.keyboard("{ArrowUp}")
  await expect.element(input()).toHaveValue("15")
  await userEvent.keyboard("{ArrowDown}{ArrowDown}")
  await expect.element(input()).toHaveValue("5")
  await expect.element(input()).toHaveAttribute("aria-valuenow", "5")
})

test("steps the value by step from the triggers, and disables a trigger at the end of the range", async () => {
  render(() => <Basic defaultValue="5" step={2} max={9} />)

  await userEvent.click(increment())
  await expect.element(input()).toHaveValue("7")
  await userEvent.click(decrement())
  await userEvent.click(decrement())
  await expect.element(input()).toHaveValue("3")

  await userEvent.click(increment())
  await userEvent.click(increment())
  await userEvent.click(increment())
  await expect.element(input()).toHaveValue("9")
  await expect.element(increment()).toBeDisabled()
})

test("clamps a typed value into the range when it loses focus", async () => {
  const onValueCommit = vi.fn()
  render(() => <Basic min={0} max={10} onValueCommit={onValueCommit} />)

  await userEvent.type(input(), "25")
  await expect.element(input()).toHaveAttribute("aria-invalid", "true")
  await userEvent.tab()
  await expect.element(input()).toHaveValue("10")
  await expect.element(input()).not.toHaveAttribute("aria-invalid")
  expect(onValueCommit).toHaveBeenLastCalledWith({ value: "10", valueAsNumber: 10 })
})

test("shows a controlled value and reports changes to the owner", async () => {
  function Controlled() {
    const [value, setValue] = createSignal("3")
    return (
      <>
        <button type="button" onClick={() => setValue("8")}>
          Set to 8
        </button>
        <Basic value={value()} onValueChange={(details) => setValue(details.value)} />
        <output>{value()}</output>
      </>
    )
  }
  render(() => <Controlled />)

  await expect.element(input()).toHaveValue("3")
  await userEvent.click(increment())
  await expect.element(page.getByRole("status")).toHaveTextContent("4")
  await expect.element(input()).toHaveValue("4")

  await userEvent.click(page.getByRole("button", { name: "Set to 8" }))
  await expect.element(input()).toHaveValue("8")
  await expect.element(input()).toHaveAttribute("aria-valuenow", "8")
})

test("RootProvider renders a number input driven from outside through useNumberInput", async () => {
  function External() {
    const api = useNumberInput({ min: 1, max: 99, defaultValue: "1" })
    return (
      <>
        <button type="button" onClick={() => api().setToMax()}>
          Most
        </button>
        <NumberInput.RootProvider value={api}>
          <NumberInput.Label>Quantity</NumberInput.Label>
          <NumberInput.Input />
          <NumberInput.Context>{(api) => <p>{api().valueAsNumber} selected</p>}</NumberInput.Context>
        </NumberInput.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Most" }))
  await expect.element(input()).toHaveValue("99")
  await expect.element(page.getByText("99 selected")).toBeVisible()
})
