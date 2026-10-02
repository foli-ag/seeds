import { render } from "@solidjs/testing-library"
import { createSignal, For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Pagination, usePagination } from "../src/pagination/index.js"

/** An item for each page in the API's `pages`, and an ellipsis where it leaves pages out */
function Pages() {
  return (
    <Pagination.Context>
      {(api) => (
        <For each={api().pages}>
          {(entry, index) =>
            entry.type === "page" ? (
              <Pagination.Item {...entry}>{entry.value}</Pagination.Item>
            ) : (
              <Pagination.Ellipsis index={index()}>…</Pagination.Ellipsis>
            )
          }
        </For>
      )}
    </Pagination.Context>
  )
}

function Basic(props: Pagination.RootProps) {
  return (
    <Pagination.Root count={50} {...props}>
      <Pagination.Trigger.First>«</Pagination.Trigger.First>
      <Pagination.Trigger.Prev>‹</Pagination.Trigger.Prev>
      <Pages />
      <Pagination.Trigger.Next>›</Pagination.Trigger.Next>
      <Pagination.Trigger.Last>»</Pagination.Trigger.Last>
    </Pagination.Root>
  )
}

// zag names the triggers and items with an aria-label, which takes the place of their text
const item = (label: string) => page.getByRole("button", { name: label, exact: true })
const first = () => item("first page")
const prev = () => item("previous page")
const next = () => item("next page")
const last = () => item("last page")
/** The text of the items and ellipses, in order */
const shown = () =>
  Array.from(
    document.querySelectorAll('[data-scope="pagination"]:is([data-part="item"], [data-part="ellipsis"])'),
    (element) => element.textContent,
  )

test("is a navigation with an item for each page of pageSize items out of count", async () => {
  render(() => <Basic count={45} pageSize={20} />)

  await expect.element(page.getByRole("navigation", { name: "pagination" })).toBeVisible()
  await expect.poll(shown).toEqual(["1", "2", "3"])
  await expect.element(item("last page, page 3")).toBeVisible()
})

test("selects a page item on click and reports the page", async () => {
  const onPageChange = vi.fn()
  render(() => <Basic onPageChange={onPageChange} />)

  await expect.element(item("page 1")).toHaveAttribute("aria-current", "page")
  await userEvent.click(item("page 3"))
  await expect.element(item("page 3")).toHaveAttribute("aria-current", "page")
  await expect.element(item("page 1")).not.toHaveAttribute("aria-current")
  expect(onPageChange).toHaveBeenCalledWith({ page: 3, pageSize: 10 })
})

test("moves between pages with the triggers, which are disabled at the ends", async () => {
  render(() => <Basic />)

  await expect.element(prev()).toBeDisabled()
  await expect.element(first()).toBeDisabled()

  await userEvent.click(next())
  await expect.element(item("page 2")).toHaveAttribute("aria-current", "page")
  await expect.element(prev()).toBeEnabled()

  await userEvent.click(last())
  await expect.element(item("last page, page 5")).toHaveAttribute("aria-current", "page")
  await expect.element(next()).toBeDisabled()
  await expect.element(last()).toBeDisabled()

  await userEvent.click(prev())
  await expect.element(item("page 4")).toHaveAttribute("aria-current", "page")
  await userEvent.click(first())
  await expect.element(item("page 1")).toHaveAttribute("aria-current", "page")
})

test("leaves pages out behind ellipses, keeping siblingCount pages on each side of the current one", async () => {
  render(() => <Basic count={200} defaultPage={10} siblingCount={2} />)

  await expect.poll(shown).toEqual(["1", "…", "8", "9", "10", "11", "12", "…", "20"])
  await userEvent.click(item("page 12"))
  await expect.poll(shown).toEqual(["1", "…", "10", "11", "12", "13", "14", "…", "20"])
})

test("keeps page items as plain buttons, so they do not submit a form around them", async () => {
  const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
  render(() => (
    <form onSubmit={onSubmit}>
      <Basic />
    </form>
  ))

  // The current page's item, which clicking leaves in place: a form only submits from a button still in it
  await userEvent.click(item("page 1"))
  expect(onSubmit).not.toHaveBeenCalled()
})

test("renders links to the pages from getPageUrl with type link", async () => {
  render(() => (
    <Pagination.Root type="link" count={30} defaultPage={2} getPageUrl={({ page }) => `/posts?page=${page}`}>
      <Pagination.Trigger.Prev as="a">Newer</Pagination.Trigger.Prev>
      <Pagination.Item as="a" value={3}>
        3
      </Pagination.Item>
    </Pagination.Root>
  ))

  await expect.element(page.getByRole("link", { name: "previous page" })).toHaveAttribute("href", "/posts?page=1")
  await expect.element(page.getByRole("link", { name: "last page, page 3" })).toHaveAttribute("href", "/posts?page=3")
})

test("shows a controlled page and reports changes to the owner", async () => {
  function Controlled() {
    const [current, setCurrent] = createSignal(2)
    return (
      <>
        <button type="button" onClick={() => setCurrent(4)}>
          Go to 4
        </button>
        <Basic page={current()} onPageChange={(details) => setCurrent(details.page)} />
        <output>{current()}</output>
      </>
    )
  }
  render(() => <Controlled />)

  await expect.element(item("page 2")).toHaveAttribute("aria-current", "page")
  await userEvent.click(next())
  await expect.element(page.getByRole("status")).toHaveTextContent("3")
  await expect.element(item("page 3")).toHaveAttribute("aria-current", "page")

  await userEvent.click(page.getByRole("button", { name: "Go to 4" }))
  await expect.element(item("page 4")).toHaveAttribute("aria-current", "page")
})

test("RootProvider renders a pagination driven from outside through usePagination", async () => {
  const rows = Array.from({ length: 23 }, (_, index) => `Row ${index + 1}`)
  function External() {
    const api = usePagination({ count: rows.length, pageSize: 5 })
    return (
      <>
        <ul>
          <For each={api().slice(rows)}>{(row) => <li>{row}</li>}</For>
        </ul>
        <button type="button" onClick={() => api().goToLastPage()}>
          Oldest
        </button>
        <Pagination.RootProvider value={api}>
          <Pagination.Trigger.Next>›</Pagination.Trigger.Next>
          <Pagination.Context>
            {(api) => (
              <p>
                Page {api().page} of {api().totalPages}
              </p>
            )}
          </Pagination.Context>
        </Pagination.RootProvider>
      </>
    )
  }
  render(() => <External />)

  const rowTexts = () =>
    page
      .getByRole("listitem")
      .elements()
      .map((row) => row.textContent)
  await expect.poll(rowTexts).toEqual(["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"])

  await userEvent.click(next())
  await expect.element(page.getByText("Page 2 of 5")).toBeVisible()
  await expect.poll(rowTexts).toEqual(["Row 6", "Row 7", "Row 8", "Row 9", "Row 10"])

  await userEvent.click(page.getByRole("button", { name: "Oldest" }))
  await expect.poll(rowTexts).toEqual(["Row 21", "Row 22", "Row 23"])
  await expect.element(next()).toBeDisabled()
})

// A pagination has nothing to open, so Trigger only groups the triggers that move between pages
// @ts-expect-error Pagination.Trigger is not a component
;() => <Pagination.Trigger />
