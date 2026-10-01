import { render } from "@solidjs/testing-library"
import { For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Accordion } from "../src/accordion/index.js"

const items = ["Shipping", "Returns"]

function Basic(props: Accordion.RootProps) {
  return (
    <Accordion.Root {...props}>
      <For each={items}>
        {(item) => (
          <Accordion.Item value={item}>
            <Accordion.Item.Trigger>{item}</Accordion.Item.Trigger>
            <Accordion.Item.Content>
              {item} policy
              <Accordion.Item.Context>{(state) => <p>{state().expanded ? "expanded" : ""}</p>}</Accordion.Item.Context>
            </Accordion.Item.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion.Root>
  )
}

const trigger = (name: string) => page.getByRole("button", { name })
const region = (name: string) => page.getByRole("region", { name })
const content = (name: string) =>
  [...document.querySelectorAll('[data-scope="accordion"][data-part="item-content"]')].find((el) =>
    el.textContent?.startsWith(name),
  )

test("expands one item at a time and reports the value", async () => {
  const onValueChange = vi.fn()
  render(() => <Basic onValueChange={onValueChange} />)

  await userEvent.click(trigger("Shipping"))
  await expect.element(region("Shipping")).toHaveTextContent(/Shipping policy\s*expanded/)
  expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["Shipping"] }))

  await userEvent.click(trigger("Returns"))
  await expect.element(region("Returns")).toBeVisible()
  await expect.element(region("Shipping")).not.toBeInTheDocument()
})

test("keeps several items expanded with `multiple`", async () => {
  render(() => <Basic multiple />)

  await userEvent.click(trigger("Shipping"))
  await userEvent.click(trigger("Returns"))
  await expect.element(region("Shipping")).toBeVisible()
  await expect.element(region("Returns")).toBeVisible()
})

test("moves focus between triggers with the arrow keys", async () => {
  render(() => <Basic />)

  await userEvent.click(trigger("Shipping"))
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(trigger("Returns")).toHaveFocus()
})

test("mounts item content as the root's lazyMount and unmountOnExit say", async () => {
  render(() => <Basic lazyMount unmountOnExit />)

  expect(content("Shipping")).toBeUndefined()

  await userEvent.click(trigger("Shipping"))
  await expect.poll(() => content("Shipping")).toBeDefined()

  await userEvent.click(trigger("Returns"))
  await expect.poll(() => content("Shipping")).toBeUndefined()
})
