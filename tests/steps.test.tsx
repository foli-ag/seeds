import { render } from "@solidjs/testing-library"
import { For } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { Steps } from "../src"

const names = ["Account", "Profile"]

function Basic(props: Steps.RootProps) {
  return (
    <Steps.Root count={names.length} {...props}>
      <Steps.List>
        <For each={names}>
          {(name, index) => (
            <Steps.Item index={index()}>
              <Steps.Item.Trigger>
                <Steps.Indicator>{index() + 1}</Steps.Indicator>
                {name}
              </Steps.Item.Trigger>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>
      <For each={names}>{(name, index) => <Steps.Content index={index()}>{name} form</Steps.Content>}</For>
      <Steps.CompletedContent>All done</Steps.CompletedContent>
      <Steps.Trigger.Prev>Back</Steps.Trigger.Prev>
      <Steps.Trigger.Next>Next</Steps.Trigger.Next>
    </Steps.Root>
  )
}

test("moves between steps with Trigger.Next and Trigger.Prev", async () => {
  const onStepChange = vi.fn()
  render(() => <Basic onStepChange={onStepChange} />)

  await expect.element(page.getByText("Account form")).toBeVisible()
  await expect.element(page.getByRole("button", { name: "Back" })).toBeDisabled()

  await userEvent.click(page.getByRole("button", { name: "Next" }))
  await expect.element(page.getByText("Profile form")).toBeVisible()
  await expect.element(page.getByText("Account form")).not.toBeVisible()
  expect(onStepChange).toHaveBeenCalledWith({ step: 1 })

  await userEvent.click(page.getByRole("button", { name: "Back" }))
  await expect.element(page.getByText("Account form")).toBeVisible()
})

test("goes to a step from its trigger", async () => {
  render(() => <Basic />)

  await userEvent.click(page.getByRole("tab", { name: "Profile" }))
  await expect.element(page.getByText("Profile form")).toBeVisible()
})

test("shows the completed content after the last step", async () => {
  render(() => <Basic defaultStep={1} />)

  await userEvent.click(page.getByRole("button", { name: "Next" }))
  await expect.element(page.getByText("All done")).toBeVisible()
  await expect.element(page.getByText("Profile form")).not.toBeVisible()
})

// Steps has nothing to open, so Trigger only groups Prev and Next
// @ts-expect-error Steps.Trigger is not a component
;() => <Steps.Trigger />
