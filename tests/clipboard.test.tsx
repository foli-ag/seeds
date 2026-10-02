import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Clipboard, useClipboard } from "../src/clipboard/index.js"

const link = "https://foli.ag/invite/42"

function Basic(props: Clipboard.RootProps) {
  return (
    <Clipboard.Root defaultValue={link} {...props}>
      <Clipboard.Label>Invite link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Indicator copied="Done">Copy</Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}

const input = () => page.getByRole("textbox", { name: "Invite link" })
const trigger = () => page.getByRole("button", { name: "Copy to clipboard" })
const copiedTrigger = () => page.getByRole("button", { name: "Copied to clipboard" })

/** Chromium refuses clipboard writes from the test frame, which never has focus, so the write is recorded instead */
const stubClipboard = () => vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined)

test("the trigger copies the value and shows it copied until the timeout", async () => {
  const writeText = stubClipboard()
  const onStatusChange = vi.fn()
  render(() => <Basic timeout={500} onStatusChange={onStatusChange} />)

  await expect.element(trigger().getByText("Copy")).toBeVisible()
  await userEvent.click(trigger())
  expect(writeText).toHaveBeenCalledWith(link)
  expect(onStatusChange).toHaveBeenCalledWith({ copied: true })
  await expect.element(copiedTrigger().getByText("Done")).toBeVisible()
  await expect.element(copiedTrigger()).toHaveTextContent(/^Done$/)
  await expect.element(copiedTrigger()).toHaveAttribute("data-copied")

  await expect.element(trigger().getByText("Copy")).toBeVisible()
  await expect.element(trigger()).not.toHaveAttribute("data-copied")
})

test("the input shows the value read-only, selects it on focus and counts a copy from it", async () => {
  const onStatusChange = vi.fn()
  render(() => <Basic onStatusChange={onStatusChange} />)

  await expect.element(input()).toHaveValue(link)
  await expect.element(input()).toHaveAttribute("readonly")

  await userEvent.tab()
  const element = input().element() as HTMLInputElement
  await expect.element(element).toHaveFocus()
  expect([element.selectionStart, element.selectionEnd]).toEqual([0, link.length])

  await userEvent.keyboard("{Control>}c{/Control}")
  await expect.element(copiedTrigger()).toBeVisible()
  expect(onStatusChange).toHaveBeenCalledWith({ copied: true })
  // Solid writes the value prop again as the input turns data-copied, which must leave the selection alone
  await expect.element(element).toHaveAttribute("data-copied")
  expect([element.selectionStart, element.selectionEnd]).toEqual([0, link.length])
})

test("follows `value` when controlled", async () => {
  const writeText = stubClipboard()
  const [value, setValue] = createSignal("first")
  render(() => <Basic value={value()} />)

  await expect.element(input()).toHaveValue("first")
  setValue("second")
  await expect.element(input()).toHaveValue("second")

  await userEvent.click(trigger())
  expect(writeText).toHaveBeenCalledWith("second")
})

test("RootProvider renders a clipboard driven from outside through useClipboard", async () => {
  const writeText = stubClipboard()
  function External() {
    const api = useClipboard({ defaultValue: "draft" })
    return (
      <>
        <button type="button" onClick={() => api().setValue("final")}>
          Finalize
        </button>
        <button type="button" onClick={() => api().copy()}>
          Copy from outside
        </button>
        <Clipboard.RootProvider value={api}>
          <Clipboard.ValueText />
          <Clipboard.Context>{(api) => <p>{api().copied ? "copied" : "not copied"}</p>}</Clipboard.Context>
        </Clipboard.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await expect.element(page.getByText("draft", { exact: true })).toBeVisible()
  await userEvent.click(page.getByRole("button", { name: "Finalize" }))
  await expect.element(page.getByText("final", { exact: true })).toBeVisible()

  await userEvent.click(page.getByRole("button", { name: "Copy from outside" }))
  expect(writeText).toHaveBeenCalledWith("final")
  await expect.element(page.getByText("copied", { exact: true })).toBeVisible()
})
