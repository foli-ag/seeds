import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Switch } from "../src/switch/index.js"

function Basic(props: Switch.RootProps) {
  return (
    <Switch.Root {...props}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

const control = () => page.getByRole("checkbox", { name: "Notifications" })

test("toggles from a click on its label", async () => {
  render(() => <Basic />)

  await expect.element(control()).not.toBeChecked()
  await userEvent.click(page.getByText("Notifications"))
  await expect.element(control()).toBeChecked()
})

test("follows `checked` when controlled", async () => {
  const [checked, setChecked] = createSignal(false)
  render(() => <Basic checked={checked()} onCheckedChange={(details) => setChecked(details.checked)} />)

  await userEvent.click(page.getByText("Notifications"))
  await expect.element(control()).toBeChecked()

  setChecked(false)
  await expect.element(control()).not.toBeChecked()
})
