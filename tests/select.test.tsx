import { render } from "@solidjs/testing-library"
import { For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { createListCollection, Select } from "../src"

const fruits = createListCollection({
  items: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry", disabled: true },
  ],
})

function Basic(props: Omit<Select.RootProps, "collection">) {
  return (
    <Select.Root collection={fruits} {...props}>
      <Select.Label>Fruit</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Pick a fruit" />
        </Select.Trigger>
        <Select.Trigger.Clear>Clear</Select.Trigger.Clear>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.Group>
            <Select.Group.Label>Fruits</Select.Group.Label>
            <For each={fruits.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.Item.Text>{item.label}</Select.Item.Text>
                  <Select.Item.Indicator>✓</Select.Item.Indicator>
                </Select.Item>
              )}
            </For>
          </Select.Group>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

const trigger = () => page.getByRole("combobox", { name: "Fruit" })
const option = (name: string) => page.getByRole("option", { name })

test("shows the label of the item picked from the list", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await expect.element(trigger()).toHaveTextContent("Pick a fruit")
  await userEvent.click(trigger())
  await expect.element(page.getByRole("group", { name: "Fruits" })).toBeVisible()
  await userEvent.click(option("Banana"))

  await expect.element(trigger()).toHaveTextContent("Banana")
  expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ["banana"] }))
  await expect.element(page.getByRole("listbox")).not.toBeInTheDocument()
})

test("picks an item with the keyboard, skipping disabled ones", async () => {
  render(() => <Basic />)

  trigger().element().focus()
  await userEvent.keyboard("{Enter}")
  await expect.element(page.getByRole("listbox")).toBeVisible()
  await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}")
  await expect.element(trigger()).toHaveTextContent("Banana")
})

test("clears the value from Trigger.Clear", async () => {
  render(() => <Basic defaultValue={["apple"]} />)

  await expect.element(trigger()).toHaveTextContent("Apple")
  await userEvent.click(page.getByRole("button", { name: "Clear" }))
  await expect.element(trigger()).toHaveTextContent("Pick a fruit")
})

test("submits the selected values with a form", async () => {
  let form!: HTMLFormElement
  render(() => (
    <form ref={form}>
      <Basic name="fruit" multiple />
    </form>
  ))

  await userEvent.click(trigger())
  await userEvent.click(option("Apple"))
  await userEvent.click(option("Banana"))
  await expect.poll(() => new FormData(form).getAll("fruit")).toEqual(["apple", "banana"])
})
