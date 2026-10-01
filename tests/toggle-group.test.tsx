import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { ToggleGroup } from "../src"

function Basic(props: ToggleGroup.RootProps) {
  return (
    <ToggleGroup.Root aria-label="Text style" {...props}>
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

// One pressed item at a time makes the group a radio group, several make it a group of toggle buttons
const radio = (name: string) => page.getByRole("radio", { name })
const toggle = (name: string) => page.getByRole("button", { name })

test("presses one item at a time and reports the value", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await userEvent.click(radio("Bold"))
  await expect.element(radio("Bold")).toBeChecked()
  expect(onValueChange).toHaveBeenLastCalledWith({ value: ["bold"] })

  await userEvent.click(radio("Italic"))
  await expect.element(radio("Italic")).toBeChecked()
  await expect.element(radio("Bold")).not.toBeChecked()
})

test("keeps several items pressed with `multiple`", async () => {
  render(() => <Basic multiple />)

  await userEvent.click(toggle("Bold"))
  await userEvent.click(toggle("Italic"))
  await expect.element(toggle("Bold")).toHaveAttribute("aria-pressed", "true")
  await expect.element(toggle("Italic")).toHaveAttribute("aria-pressed", "true")
})

test("moves focus between items with the arrow keys", async () => {
  render(() => <Basic />)

  await userEvent.click(radio("Bold"))
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(radio("Italic")).toHaveFocus()
})
