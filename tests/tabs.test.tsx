import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Tabs, useTabs } from "../src/tabs/index.js"

function Sections() {
  return (
    <>
      <Tabs.List aria-label="Settings">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        <Tabs.Trigger value="team">Team</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="account">Account settings</Tabs.Content>
      <Tabs.Content value="billing">Billing settings</Tabs.Content>
      <Tabs.Content value="team">Team settings</Tabs.Content>
    </>
  )
}

function Basic(props: Tabs.RootProps) {
  return (
    <Tabs.Root {...props}>
      <Sections />
    </Tabs.Root>
  )
}

const tab = (name: string) => page.getByRole("tab", { name })
// A panel takes its name from its tab, and leaves the accessibility tree while hidden
const panel = (name: string) => page.getByRole("tabpanel", { name })
const content = (text: string) =>
  [...document.querySelectorAll('[data-scope="tabs"][data-part="content"]')].find((el) => el.textContent === text)
const indicator = () => document.querySelector<HTMLElement>('[data-scope="tabs"][data-part="indicator"]')!

test("shows the panel of the clicked tab and reports the value", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic defaultValue="account" onValueChange={onValueChange} />)

  await expect.element(panel("Account")).toHaveTextContent("Account settings")

  await userEvent.click(tab("Billing"))
  await expect.element(panel("Billing")).toHaveTextContent("Billing settings")
  await expect.element(tab("Billing")).toHaveAttribute("aria-selected", "true")
  await expect.element(tab("Account")).toHaveAttribute("aria-selected", "false")
  await expect.element(panel("Account")).not.toBeInTheDocument()
  expect(onValueChange).toHaveBeenLastCalledWith({ value: "billing" })
})

test("renders a tablist whose selected tab controls its panel", async () => {
  render(() => <Basic defaultValue="account" />)

  expect(page.getByRole("tablist", { name: "Settings" }).getByRole("tab").all()).toHaveLength(3)
  await expect.element(tab("Account")).toHaveAttribute("aria-controls", panel("Account").element().id)
})

test("enters on the selected tab and moves the selection with the arrow keys, Home and End", async () => {
  render(() => <Basic defaultValue="billing" />)

  await userEvent.keyboard("{Tab}")
  await expect.element(tab("Billing")).toHaveFocus()

  await userEvent.keyboard("{ArrowRight}")
  await expect.element(tab("Team")).toHaveFocus()
  await expect.element(panel("Team")).toBeVisible()

  // Focus loops from the last tab to the first
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(panel("Account")).toBeVisible()

  await userEvent.keyboard("{End}")
  await expect.element(panel("Team")).toBeVisible()
  await userEvent.keyboard("{Home}")
  await expect.element(panel("Account")).toBeVisible()

  await userEvent.keyboard("{Tab}")
  await expect.element(panel("Account")).toHaveFocus()
})

test("reports changes and follows `value` when controlled", async () => {
  const [value, setValue] = createSignal("account")
  const onValueChange = vi.fn()
  render(() => <Basic value={value()} onValueChange={onValueChange} />)

  await userEvent.click(tab("Billing"))
  await expect.poll(() => onValueChange).toHaveBeenCalledWith({ value: "billing" })
  await expect.element(tab("Account")).toHaveAttribute("aria-selected", "true")
  expect(panel("Billing").query()).toBeNull()

  setValue("team")
  await expect.element(panel("Team")).toBeVisible()
})

test("mounts contents as the root's lazyMount and unmountOnExit say", async () => {
  render(() => <Basic defaultValue="account" lazyMount unmountOnExit />)

  expect(content("Billing settings")).toBeUndefined()

  await userEvent.click(tab("Billing"))
  await expect.poll(() => content("Billing settings")).toBeDefined()
  await expect.poll(() => content("Account settings")).toBeUndefined()
})

test("moves the indicator to the selected tab", async () => {
  render(() => <Basic defaultValue="account" />)

  await userEvent.click(tab("Team"))
  const team = tab("Team").element() as HTMLElement
  await expect.poll(() => indicator().style.getPropertyValue("--left")).toBe(`${team.offsetLeft}px`)
  expect(indicator().style.getPropertyValue("--width")).toBe(`${team.offsetWidth}px`)
})

test("RootProvider renders tabs driven from outside through useTabs", async () => {
  function External() {
    const api = useTabs({ defaultValue: "account" })
    return (
      <>
        <button type="button" onClick={() => api().setValue("team")}>
          Show the team
        </button>
        <Tabs.RootProvider value={api}>
          <Sections />
          <Tabs.Context>{(api) => <p>Showing {api().value}</p>}</Tabs.Context>
        </Tabs.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Show the team" }))
  await expect.element(panel("Team")).toBeVisible()
  await expect.element(page.getByText("Showing team")).toBeVisible()
})
