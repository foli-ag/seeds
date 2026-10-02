import { render } from "@solidjs/testing-library"
import { createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { PinInput, usePinInput } from "../src/pin-input/index.js"

function Inputs() {
  return (
    <PinInput.Control>
      <For each={[0, 1, 2]}>{(index) => <PinInput.Input index={index} />}</For>
    </PinInput.Control>
  )
}

function Basic(props: PinInput.RootProps) {
  return (
    <PinInput.Root {...props}>
      <PinInput.Label>Code</PinInput.Label>
      <Inputs />
      <PinInput.HiddenInput />
    </PinInput.Root>
  )
}

const input = (n: number) => page.getByRole("textbox", { name: `pin code ${n} of 3` })

/** Pastes `text` into the focused input, as the browser does from the clipboard */
function paste(text: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData("text/plain", text)
  document.activeElement!.dispatchEvent(new ClipboardEvent("paste", { clipboardData, bubbles: true, cancelable: true }))
}

test("moves to the next input after each character and reports the complete value", async () => {
  const onValueChange = vi.fn()
  const onValueComplete = vi.fn()
  render(() => <Basic onValueChange={onValueChange} onValueComplete={onValueComplete} />)

  await userEvent.click(input(1))
  await userEvent.keyboard("1")
  await expect.element(input(2)).toHaveFocus()
  await expect.element(input(1)).toHaveValue("1")
  expect(onValueChange).toHaveBeenLastCalledWith({ value: ["1", "", ""], valueAsString: "1" })
  expect(onValueComplete).not.toHaveBeenCalled()

  await userEvent.keyboard("23")
  await expect.element(input(3)).toHaveValue("3")
  expect(onValueComplete).toHaveBeenCalledWith({ value: ["1", "2", "3"], valueAsString: "123" })
})

test("Backspace on an empty input clears the previous one and moves back to it", async () => {
  render(() => <Basic />)

  await userEvent.click(input(1))
  await userEvent.keyboard("12")
  await expect.element(input(3)).toHaveFocus()

  await userEvent.keyboard("{Backspace}")
  await expect.element(input(2)).toHaveFocus()
  await expect.element(input(2)).toHaveValue("")
  await expect.element(input(1)).toHaveValue("1")
})

test("a paste fills the inputs from the focused one on", async () => {
  render(() => <Basic />)

  await userEvent.click(input(1))
  paste("789")
  await expect.element(input(1)).toHaveValue("7")
  await expect.element(input(2)).toHaveValue("8")
  await expect.element(input(3)).toHaveValue("9")
})

test("rejects letters while numeric, which is the default type", async () => {
  const onValueInvalid = vi.fn()
  render(() => <Basic onValueInvalid={onValueInvalid} />)

  await userEvent.click(input(1))
  await userEvent.keyboard("a")
  await expect.element(input(1)).toHaveValue("")
  await expect.element(input(1)).toHaveFocus()
  expect(onValueInvalid).toHaveBeenCalledWith({ value: "a", index: 0 })
})

test("submits the value as one string with a form", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="code" />
    </form>
  ))

  await userEvent.click(input(1))
  await userEvent.keyboard("123")
  await expect.poll(() => new FormData(form).get("code")).toBe("123")
})

test("follows `value` when controlled", async () => {
  const [value, setValue] = createSignal(["1", "2", ""])
  render(() => <Basic value={value()} onValueChange={(details) => setValue(details.value)} />)

  await expect.element(input(2)).toHaveValue("2")
  await userEvent.click(input(3))
  await userEvent.keyboard("3")
  expect(value()).toEqual(["1", "2", "3"])

  setValue(["", "", ""])
  await expect.element(input(1)).toHaveValue("")
  await expect.element(input(3)).toHaveValue("")
})

test("RootProvider renders a pin input driven from outside through usePinInput", async () => {
  function External() {
    const api = usePinInput()
    return (
      <>
        <button type="button" onClick={() => api().setValue(["4", "5", "6"])}>
          Fill
        </button>
        <PinInput.RootProvider value={api}>
          <Inputs />
          <PinInput.Context>{(api) => <p>{api().complete ? "complete" : "incomplete"}</p>}</PinInput.Context>
        </PinInput.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await expect.element(page.getByText("incomplete")).toBeVisible()
  await userEvent.click(page.getByRole("button", { name: "Fill" }))
  await expect.element(input(2)).toHaveValue("5")
  await expect.element(page.getByText("complete", { exact: true })).toBeVisible()
})
