import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { LocaleProvider, useLocaleContext, type LocaleContext } from "../src/locale/index.js"
import { NumberInput } from "../src/number-input/index.js"
import { Progress } from "../src/progress/index.js"
import { Tabs } from "../src/tabs/index.js"

function Quantity(props: NumberInput.RootProps) {
  return (
    <NumberInput.Root formatOptions={{ maximumFractionDigits: 2 }} {...props}>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

const quantity = () => page.getByRole("spinbutton", { name: "Quantity" })
const valueText = () => document.querySelector<HTMLElement>('[data-scope="progress"][data-part="value-text"]')!

test("reads and writes a number input's value in the provider's locale", async () => {
  render(() => (
    <LocaleProvider locale="fr-FR">
      <Quantity />
    </LocaleProvider>
  ))

  await userEvent.type(quantity(), "2,5")
  await expect.element(quantity()).toHaveAttribute("aria-valuenow", "2.5")
  await userEvent.keyboard("{ArrowUp}")
  await expect.element(quantity()).toHaveValue("3,5")
})

test("lets a `locale` passed to a component win over the provider's", async () => {
  render(() => (
    <LocaleProvider locale="fr-FR">
      <Quantity locale="en-US" />
    </LocaleProvider>
  ))

  await userEvent.type(quantity(), "2.5")
  await expect.element(quantity()).toHaveAttribute("aria-valuenow", "2.5")
})

test("formats a progress value in the provider's locale, and again when the locale changes", async () => {
  const [locale, setLocale] = createSignal("fr-FR")
  render(() => (
    <LocaleProvider locale={locale()}>
      <Progress.Root defaultValue={50}>
        <Progress.ValueText />
      </Progress.Root>
    </LocaleProvider>
  ))

  const percent = (locale: string) => new Intl.NumberFormat(locale, { style: "percent" }).format(0.5)
  await expect.poll(() => valueText().textContent).toBe(percent("fr-FR"))
  setLocale("de-CH")
  await expect.poll(() => valueText().textContent).toBe(percent("de-CH"))
})

test("lays out the machines inside right to left for a right-to-left locale", async () => {
  render(() => (
    <LocaleProvider locale="ar-EG">
      <Tabs.Root defaultValue="account">
        <Tabs.List aria-label="Settings">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </LocaleProvider>
  ))

  await expect.element(page.getByRole("tablist")).toHaveAttribute("dir", "rtl")
  // The next tab sits to the left of the current one
  await userEvent.click(page.getByRole("tab", { name: "Account" }))
  await userEvent.keyboard("{ArrowLeft}")
  await expect.element(page.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true")
})

test("gives zag's default locale, left to right, outside a provider", () => {
  let context: LocaleContext | undefined
  function Probe() {
    context = useLocaleContext()()
    return null
  }
  render(() => <Probe />)

  expect(context).toEqual({ locale: "en-US", dir: "ltr" })
})
