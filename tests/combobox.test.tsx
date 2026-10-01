import { render } from "@solidjs/testing-library"
import { createMemo, createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Combobox, createListCollection } from "../src"

const countries = [
  { label: "Belgium", value: "be" },
  { label: "France", value: "fr" },
  { label: "Germany", value: "de" },
]

function Basic(props: Omit<Combobox.RootProps, "collection">) {
  const [items, setItems] = createSignal(countries)
  const collection = createMemo(() => createListCollection({ items: items() }))
  const filter = (details: Combobox.InputValueChangeDetails) =>
    setItems(countries.filter((country) => country.label.toLowerCase().includes(details.inputValue.toLowerCase())))
  return (
    <Combobox.Root collection={collection()} onInputValueChange={filter} {...props}>
      <Combobox.Label>Country</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.Trigger.Clear>Clear</Combobox.Trigger.Clear>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No country matches</Combobox.Empty>
          <For each={collection().items}>
            {(item) => (
              <Combobox.Item item={item}>
                <Combobox.Item.Text>{item.label}</Combobox.Item.Text>
              </Combobox.Item>
            )}
          </For>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}

const input = () => page.getByRole("combobox", { name: "Country" })
const option = (name: string) => page.getByRole("option", { name })

test("narrows the items as the user types and picks the clicked one", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await userEvent.type(input(), "an")
  await expect.element(option("France")).toBeVisible()
  await expect.element(option("Germany")).toBeVisible()
  await expect.element(option("Belgium")).not.toBeInTheDocument()

  await userEvent.click(option("France"))
  await expect.element(input()).toHaveValue("France")
  expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ["fr"] }))
})

test("shows Empty when nothing matches", async () => {
  render(() => <Basic />)

  await userEvent.type(input(), "zz")
  await expect.element(page.getByText("No country matches")).toBeVisible()
})

test("picks the highlighted item with the keyboard", async () => {
  render(() => <Basic />)

  await userEvent.type(input(), "ger")
  await userEvent.keyboard("{ArrowDown}{Enter}")
  await expect.element(input()).toHaveValue("Germany")
})

test("clears the value from Trigger.Clear", async () => {
  render(() => <Basic defaultValue={["be"]} defaultInputValue="Belgium" />)

  await expect.element(input()).toHaveValue("Belgium")
  await userEvent.click(page.getByRole("button", { name: "Clear" }))
  await expect.element(input()).toHaveValue("")
})
