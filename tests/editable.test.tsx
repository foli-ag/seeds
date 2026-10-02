import { render } from "@solidjs/testing-library"
import { createSignal } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Editable, useEditable } from "../src/editable/index.js"

function Basic(props: Editable.RootProps) {
  return (
    <Editable.Root placeholder="Untitled" {...props}>
      <Editable.Label>Title</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <Editable.Trigger.Edit>Rename</Editable.Trigger.Edit>
        <Editable.Trigger.Submit>Save</Editable.Trigger.Submit>
        <Editable.Trigger.Cancel>Discard</Editable.Trigger.Cancel>
      </Editable.Control>
    </Editable.Root>
  )
}

// zag names the input and the triggers with its translations, over their text
const input = () => page.getByRole("textbox", { name: "editable input" })
const editTrigger = () => page.getByRole("button", { name: "edit" })
const submitTrigger = () => page.getByRole("button", { name: "submit" })
const cancelTrigger = () => page.getByRole("button", { name: "cancel" })

test("enters edit mode when the preview takes focus and commits the typed value on Enter", async () => {
  const onValueCommit = vi.fn()
  render(() => <Basic defaultValue="Draft" onValueCommit={onValueCommit} />)

  await expect.element(input()).not.toBeInTheDocument()
  await userEvent.tab()
  await expect.element(input()).toHaveFocus()
  await expect.element(input()).toHaveValue("Draft")

  // The input starts with its text selected, so typing replaces it
  await userEvent.keyboard("Report{Enter}")
  await expect.element(input()).not.toBeInTheDocument()
  await expect.element(page.getByText("Report")).toBeVisible()
  expect(onValueCommit).toHaveBeenCalledExactlyOnceWith({ value: "Report" })
})

test("enters edit mode on a double-click, not a click, with activationMode dblclick", async () => {
  render(() => <Basic defaultValue="Draft" activationMode="dblclick" />)

  await userEvent.click(page.getByText("Draft"))
  await expect.element(input()).not.toBeInTheDocument()

  await userEvent.dblClick(page.getByText("Draft"))
  await expect.element(input()).toHaveFocus()
})

test("enters edit mode from Trigger.Edit and commits from Trigger.Submit", async () => {
  const onValueCommit = vi.fn()
  render(() => <Basic onValueCommit={onValueCommit} />)

  await expect.element(submitTrigger()).not.toBeInTheDocument()
  await userEvent.click(editTrigger())
  await expect.element(input()).toHaveFocus()
  await expect.element(editTrigger()).not.toBeInTheDocument()

  await userEvent.keyboard("Report")
  await userEvent.click(submitTrigger())
  await expect.element(page.getByText("Report")).toBeVisible()
  await expect.element(editTrigger()).toHaveFocus()
  expect(onValueCommit).toHaveBeenCalledExactlyOnceWith({ value: "Report" })
})

test("reverts the typed text on Escape and from Trigger.Cancel", async () => {
  const onValueRevert = vi.fn()
  render(() => <Basic defaultValue="Draft" onValueRevert={onValueRevert} />)

  await userEvent.click(editTrigger())
  await userEvent.keyboard("Report{Escape}")
  await expect.element(input()).not.toBeInTheDocument()
  await expect.element(page.getByText("Draft")).toBeVisible()
  expect(onValueRevert).toHaveBeenCalledExactlyOnceWith({ value: "Draft" })

  await userEvent.click(editTrigger())
  await userEvent.keyboard("Report")
  await userEvent.click(cancelTrigger())
  await expect.element(page.getByText("Draft")).toBeVisible()
  expect(onValueRevert).toHaveBeenCalledTimes(2)
})

test("shows the placeholder in the preview while the value is empty", async () => {
  render(() => <Basic />)

  await expect.element(page.getByText("Untitled")).toHaveAttribute("data-placeholder-shown")
  await userEvent.click(editTrigger())
  await expect.element(input()).toHaveAttribute("placeholder", "Untitled")

  await userEvent.keyboard("Report{Enter}")
  await expect.element(page.getByText("Report")).not.toHaveAttribute("data-placeholder-shown")
  await expect.element(page.getByText("Untitled")).not.toBeInTheDocument()
})

test("follows a controlled value and edit mode, and reports changes to the owner", async () => {
  function Controlled() {
    const [value, setValue] = createSignal("Draft")
    const [edit, setEdit] = createSignal(false)
    return (
      <>
        <button type="button" onClick={() => setValue("Final")}>
          Set to Final
        </button>
        <button type="button" onClick={() => setEdit(true)}>
          Start editing
        </button>
        <Basic
          value={value()}
          onValueChange={(details) => setValue(details.value)}
          edit={edit()}
          onEditChange={(details) => setEdit(details.edit)}
        />
        <output>Owner has {value()}</output>
      </>
    )
  }
  render(() => <Controlled />)

  await userEvent.click(page.getByRole("button", { name: "Set to Final" }))
  await expect.element(page.getByText("Final", { exact: true })).toBeVisible()

  await userEvent.click(page.getByRole("button", { name: "Start editing" }))
  await expect.element(input()).toHaveFocus()
  await expect.element(input()).toHaveValue("Final")

  await userEvent.keyboard("Report")
  await expect.element(page.getByRole("status")).toHaveTextContent("Owner has Report")
  await userEvent.keyboard("{Enter}")
  await expect.element(page.getByText("Report", { exact: true })).toBeVisible()
  await expect.element(input()).not.toBeInTheDocument()
})

test("keeps the typed text when another prop of the input changes before a controlled value catches up", async () => {
  function Debounced() {
    // The owner stores the value once typing pauses, and flags it as too long right away
    const [value, setValue] = createSignal("")
    const [tooLong, setTooLong] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    const onValueChange = (details: Editable.ValueChangeDetails) => {
      setTooLong(details.value.length > 3)
      clearTimeout(timer)
      timer = setTimeout(() => setValue(details.value), 200)
    }
    return <Basic value={value()} onValueChange={onValueChange} invalid={tooLong()} />
  }
  render(() => <Debounced />)

  await userEvent.click(editTrigger())
  await userEvent.keyboard("Report")
  await expect.element(input()).toHaveValue("Report")
  await expect.element(input()).toHaveAttribute("aria-invalid", "true")
})

test("RootProvider renders an editable driven from outside through useEditable", async () => {
  function External() {
    const api = useEditable({ defaultValue: "Draft" })
    return (
      <>
        <button type="button" onClick={() => api().edit()}>
          Rename from outside
        </button>
        <Editable.RootProvider value={api}>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Context>{(api) => <p>{api().editing ? "is editing" : "is previewing"}</p>}</Editable.Context>
        </Editable.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await expect.element(page.getByText("is previewing")).toBeVisible()
  await userEvent.click(page.getByRole("button", { name: "Rename from outside" }))
  await expect.element(input()).toHaveFocus()
  await expect.element(input()).toHaveValue("Draft")
  await expect.element(page.getByText("is editing")).toBeVisible()
})
