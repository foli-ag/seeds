import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { PasswordInput, usePasswordInput } from "../src/password-input/index.js"

function Basic(props: PasswordInput.RootProps) {
  return (
    <PasswordInput.Root {...props}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input />
        <PasswordInput.Trigger.Visibility>
          <PasswordInput.Indicator fallback="show">hide</PasswordInput.Indicator>
        </PasswordInput.Trigger.Visibility>
      </PasswordInput.Control>
    </PasswordInput.Root>
  )
}

// The trigger's label also says "password", so the input's must match exactly
const input = () => page.getByLabelText("Password", { exact: true })
const showTrigger = () => page.getByRole("button", { name: "Show password" })
const hideTrigger = () => page.getByRole("button", { name: "Hide password" })

test("is a password field labelled by its label, which a password manager fills as the current password", async () => {
  render(() => <Basic />)

  await expect.element(input()).toHaveAttribute("type", "password")
  await expect.element(input()).toHaveAttribute("autocomplete", "current-password")
  await expect.element(input()).not.toHaveAttribute("data-1p-ignore")
})

test("the visibility trigger shows the password as text and hides it again, reporting each change", async () => {
  const onVisibilityChange = vi.fn()
  render(() => <Basic onVisibilityChange={onVisibilityChange} />)

  await expect.element(showTrigger()).toHaveAttribute("aria-expanded", "false")
  await userEvent.click(showTrigger())
  await expect.element(input()).toHaveAttribute("type", "text")
  await expect.element(hideTrigger()).toHaveAttribute("aria-expanded", "true")
  await expect.element(input()).toHaveFocus()
  expect(onVisibilityChange).toHaveBeenLastCalledWith({ visible: true })

  await userEvent.click(hideTrigger())
  await expect.element(input()).toHaveAttribute("type", "password")
  await expect.element(showTrigger()).toHaveAttribute("aria-expanded", "false")
  expect(onVisibilityChange).toHaveBeenLastCalledWith({ visible: false })
})

test("keeps the typed password while its visibility changes", async () => {
  render(() => <Basic />)

  await userEvent.type(input(), "hunter2")
  await userEvent.click(showTrigger())
  await expect.element(input()).toHaveAttribute("type", "text")
  await expect.element(input()).toHaveValue("hunter2")

  await userEvent.keyboard("!")
  await userEvent.click(hideTrigger())
  await expect.element(input()).toHaveAttribute("type", "password")
  await expect.element(input()).toHaveValue("hunter2!")
})

test("the indicator shows its children while the password is visible and its fallback while it is hidden", async () => {
  render(() => <Basic />)

  await expect.element(showTrigger()).toHaveTextContent(/^show$/)
  await userEvent.click(showTrigger())
  await expect.element(hideTrigger()).toHaveTextContent(/^hide$/)
})

test("follows `visible` when controlled", async () => {
  const [visible, setVisible] = createSignal(true)
  render(() => <Basic visible={visible()} onVisibilityChange={(details) => setVisible(details.visible)} />)

  await expect.element(input()).toHaveAttribute("type", "text")
  await userEvent.click(hideTrigger())
  await expect.element(input()).toHaveAttribute("type", "password")
  expect(visible()).toBe(false)

  setVisible(true)
  await expect.element(input()).toHaveAttribute("type", "text")
})

test("asks for a new password, and keeps password managers out with ignorePasswordManagers", async () => {
  render(() => <Basic autoComplete="new-password" ignorePasswordManagers />)

  await expect.element(input()).toHaveAttribute("autocomplete", "new-password")
  await expect.element(input()).toHaveAttribute("data-1p-ignore", "")
  await expect.element(input()).toHaveAttribute("data-lpignore", "true")
  await expect.element(input()).toHaveAttribute("data-bwignore", "true")
})

test("submits under its name, and hides the password again when its form is reset", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="password" />
    </form>
  ))

  await userEvent.type(input(), "hunter2")
  await userEvent.click(showTrigger())
  await expect.element(input()).toHaveAttribute("type", "text")
  expect(new FormData(form).get("password")).toBe("hunter2")

  form.reset()
  await expect.element(input()).toHaveAttribute("type", "password")
})

test("RootProvider renders a password input driven from outside through usePasswordInput", async () => {
  function External() {
    const api = usePasswordInput()
    return (
      <>
        <button type="button" onClick={() => api().setVisible(true)}>
          Reveal
        </button>
        <PasswordInput.RootProvider value={api}>
          <PasswordInput.Label>Password</PasswordInput.Label>
          <PasswordInput.Input />
          <PasswordInput.Context>{(api) => <p>{api().visible ? "shown" : "hidden"}</p>}</PasswordInput.Context>
        </PasswordInput.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await expect.element(page.getByText("hidden")).toBeVisible()
  await userEvent.click(page.getByRole("button", { name: "Reveal" }))
  await expect.element(input()).toHaveAttribute("type", "text")
  await expect.element(page.getByText("shown")).toBeVisible()
})
