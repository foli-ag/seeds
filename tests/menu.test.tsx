import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Menu } from "../src/menu/index.js"

const trigger = () => page.getByRole("button", { name: "Actions" })
const item = (name: string) => page.getByRole("menuitem", { name })

test("selects an item from the keyboard and closes", async () => {
  const onSelect = vi.fn()
  const onRename = vi.fn()
  render(() => (
    <Menu.Root onSelect={onSelect}>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="rename" onSelect={onRename}>
            Rename
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="delete">Delete</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  ))

  await userEvent.click(trigger())
  await expect.element(page.getByRole("menu")).toBeVisible()
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(item("Rename")).toHaveAttribute("data-highlighted")
  await userEvent.keyboard("{Enter}")

  expect(onSelect).toHaveBeenCalledWith({ value: "rename" })
  expect(onRename).toHaveBeenCalledOnce()
  await expect.element(page.getByRole("menu")).not.toBeInTheDocument()
})

test("toggles checkbox items and checks radio items", async () => {
  const [wrap, setWrap] = createSignal(false)
  const [sort, setSort] = createSignal("name")
  render(() => (
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item.Checkbox value="wrap" checked={wrap()} onCheckedChange={setWrap}>
            <Menu.Item.Indicator>✓</Menu.Item.Indicator>
            <Menu.Item.Text>Wrap lines</Menu.Item.Text>
          </Menu.Item.Checkbox>
          <Menu.Group.Radio value={sort()} onValueChange={(details) => setSort(details.value)}>
            <Menu.Group.Label>Sort by</Menu.Group.Label>
            <Menu.Item.Radio value="name">Name</Menu.Item.Radio>
            <Menu.Item.Radio value="date">Date</Menu.Item.Radio>
          </Menu.Group.Radio>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  ))

  await userEvent.click(trigger())
  const checkbox = page.getByRole("menuitemcheckbox", { name: "Wrap lines" })
  await expect.element(page.getByText("✓")).not.toBeVisible()
  await userEvent.click(checkbox)
  await expect.element(checkbox).toBeChecked()
  await expect.element(page.getByText("✓")).toBeVisible()

  const group = page.getByRole("group", { name: "Sort by" })
  await expect.element(group.getByRole("menuitemradio", { name: "Name" })).toBeChecked()
  await userEvent.click(group.getByRole("menuitemradio", { name: "Date" }))
  await expect.element(group.getByRole("menuitemradio", { name: "Date" })).toBeChecked()
  await expect.element(group.getByRole("menuitemradio", { name: "Name" })).not.toBeChecked()
})

test("opens a submenu from its item", async () => {
  const onSelect = vi.fn()
  render(() => (
    <Menu.Root>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="rename">Rename</Menu.Item>
          <Menu.Root onSelect={onSelect}>
            <Menu.Item.Submenu>Share</Menu.Item.Submenu>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="email">Email</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  ))

  await userEvent.click(trigger())
  await userEvent.click(item("Share"))
  await expect.element(item("Share")).toHaveAttribute("aria-expanded", "true")
  await userEvent.click(item("Email"))
  expect(onSelect).toHaveBeenCalledWith({ value: "email" })
})

test("opens at the pointer from Trigger.Context", async () => {
  render(() => (
    <Menu.Root>
      <Menu.Trigger.Context style={{ width: "200px", height: "100px" }}>Right click here</Menu.Trigger.Context>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="copy">Copy</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  ))

  await userEvent.click(page.getByText("Right click here"), { button: "right" })
  await expect.element(item("Copy")).toBeVisible()
})
