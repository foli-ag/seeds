import { render } from "@solidjs/testing-library"
import { Show } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { NavigationMenu } from "../src"

function Basic(props: { viewport?: boolean }) {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Item.Trigger>Products</NavigationMenu.Item.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="pricing">
          <NavigationMenu.Link href="#pricing" current>
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <Show when={props.viewport}>
        <NavigationMenu.Viewport.Positioner>
          <NavigationMenu.Viewport />
        </NavigationMenu.Viewport.Positioner>
      </Show>
    </NavigationMenu.Root>
  )
}

const trigger = () => page.getByRole("button", { name: "Products" })
const analytics = () => page.getByText("Analytics")

test("opens an item's content from its trigger and closes it on Escape", async () => {
  render(() => <Basic />)

  await expect.element(analytics()).not.toBeVisible()
  await userEvent.click(trigger())
  await expect.element(analytics()).toBeVisible()
  await expect.element(trigger()).toHaveAttribute("aria-expanded", "true")

  await userEvent.keyboard("{Escape}")
  await expect.element(analytics()).not.toBeVisible()
})

test("shows the open content inside the viewport", async () => {
  render(() => <Basic viewport />)

  await userEvent.click(trigger())
  await expect.element(analytics()).toBeVisible()
  expect(analytics().element().closest('[data-scope="navigation-menu"][data-part="viewport"]')).not.toBeNull()
})

test("marks the current link", async () => {
  render(() => <Basic />)

  await expect.element(page.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page")
})
