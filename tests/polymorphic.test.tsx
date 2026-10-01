import { render } from "@solidjs/testing-library"
import type { JSX } from "@solidjs/web"
import { createSignal, flush, omit, type Element } from "solid-js"
import { page } from "vitest/browser"
import { Polymorphic, type PolymorphicProps, type ValidComponent } from "../src"

// A component of an app's own, built the way the docs suggest
function Button<As extends ValidComponent = "button">(
  props: PolymorphicProps<As, { variant?: "solid" | "ghost" }>,
): Element {
  const rest = omit(props, "variant")
  return <Polymorphic as="button" data-variant={props.variant ?? "solid"} {...rest} />
}

function Link(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const rest = omit(props, "to")
  return <a href={props.to} {...rest} />
}

test("renders its own element unless the caller passes as", async () => {
  render(() => (
    <>
      <Button>Save</Button>
      <Button as="a" href="#docs" variant="ghost">
        Docs
      </Button>
      <Button as={Link} to="#home">
        Home
      </Button>
    </>
  ))

  await expect.element(page.getByRole("button", { name: "Save" })).toHaveAttribute("data-variant", "solid")
  await expect.element(page.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "#docs")
  await expect.element(page.getByRole("link", { name: "Docs" })).toHaveAttribute("data-variant", "ghost")
  await expect.element(page.getByRole("link", { name: "Home" })).toHaveAttribute("href", "#home")
})

test("swaps the element when as changes", async () => {
  const [as, setAs] = createSignal<"button" | "span">("button")
  render(() => <Button as={as()}>Go</Button>)

  const element = () => document.querySelector("[data-variant]")!
  expect(element().tagName).toBe("BUTTON")
  setAs("span")
  flush()
  expect(element().tagName).toBe("SPAN")
})

// The caller's `as` decides which props the component takes
// @ts-expect-error a button takes no href
;() => <Button href="#" />
// @ts-expect-error variant is solid or ghost
;() => <Button variant="outline" />
// @ts-expect-error Link requires to
;() => <Button as={Link} />
