import { render } from "@solidjs/testing-library"
import { page } from "vitest/browser"
import { Avatar } from "../src"

const pixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

function Basic(props: { src: string; onStatusChange?: Avatar.RootProps["onStatusChange"] }) {
  return (
    <Avatar.Root onStatusChange={props.onStatusChange}>
      <Avatar.Fallback>AL</Avatar.Fallback>
      <Avatar.Image src={props.src} alt="Ada Lovelace" />
    </Avatar.Root>
  )
}

test("swaps the fallback for the image once it loads", async () => {
  const onStatusChange = vi.fn()
  render(() => <Basic src={pixel} onStatusChange={onStatusChange} />)

  await expect.element(page.getByRole("img", { name: "Ada Lovelace" })).toBeVisible()
  await expect.element(page.getByText("AL")).not.toBeVisible()
  expect(onStatusChange).toHaveBeenCalledWith({ status: "loaded" })
})

test("keeps the fallback when the image fails to load", async () => {
  const onStatusChange = vi.fn()
  render(() => <Basic src="data:image/png;base64,broken" onStatusChange={onStatusChange} />)

  await expect.poll(() => onStatusChange).toHaveBeenCalledWith({ status: "error" })
  await expect.element(page.getByText("AL")).toBeVisible()
  await expect.element(page.getByRole("img", { name: "Ada Lovelace" })).not.toBeInTheDocument()
})
