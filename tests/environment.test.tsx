import { render } from "@solidjs/testing-library"
import { page, userEvent } from "vitest/browser"
import { EnvironmentProvider, useEnvironmentContext, type EnvironmentContext } from "../src/environment/index.js"
import { Tabs } from "../src/tabs/index.js"

function renderTabsInShadowRoot() {
  const host = document.createElement("div")
  document.body.append(host)
  onTestFinished(() => host.remove())
  const container = document.createElement("div")
  host.attachShadow({ mode: "open" }).append(container)
  return render(
    () => (
      <EnvironmentProvider>
        <Tabs.Root defaultValue="account">
          <Tabs.List aria-label="Settings">
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </EnvironmentProvider>
    ),
    { container },
  )
}

test("lets the machines inside find their elements in the shadow root it renders in", async () => {
  renderTabsInShadowRoot()

  await userEvent.click(page.getByRole("tab", { name: "Account" }))
  // zag finds the next tab through the list's id, which the page's document cannot resolve
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(page.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true")
})

test("lets a machine unmounted before its next frame look up elements once the provider has left the DOM", async () => {
  const errors: unknown[] = []
  const onError = (event: ErrorEvent) => errors.push(event.error)
  window.addEventListener("error", onError)
  onTestFinished(() => window.removeEventListener("error", onError))
  const { unmount } = renderTabsInShadowRoot()

  // The tabs machine looks up the selected tab's content on the frame after mounting
  unmount()
  await new Promise(requestAnimationFrame)

  expect(errors).toEqual([])
})

test("resolves the document and window of the root node given as `value`", () => {
  const iframe = document.createElement("iframe")
  document.body.append(iframe)
  onTestFinished(() => iframe.remove())
  const frame = iframe.contentDocument!
  let environment: EnvironmentContext | undefined
  function Probe() {
    environment = useEnvironmentContext()()
    return null
  }
  render(() => (
    <EnvironmentProvider value={frame}>
      <Probe />
    </EnvironmentProvider>
  ))

  expect(environment?.getRootNode()).toBe(frame)
  expect(environment?.getDocument()).toBe(frame)
  expect(environment?.getWindow()).toBe(iframe.contentWindow)
})
