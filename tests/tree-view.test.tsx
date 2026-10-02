import { render } from "@solidjs/testing-library"
import { createSignal, For, omit, Show } from "solid-js"
import { page, userEvent } from "vitest/browser"
import { createTreeCollection, TreeView, useTreeView } from "../src/tree-view/index.js"

interface File {
  value: string
  label: string
  children?: File[]
}

const collection = createTreeCollection<File>({
  rootNode: {
    value: "root",
    label: "",
    children: [
      {
        value: "src",
        label: "src",
        children: [
          { value: "app.tsx", label: "app.tsx" },
          { value: "utils", label: "utils", children: [{ value: "format.ts", label: "format.ts" }] },
        ],
      },
      { value: "package.json", label: "package.json" },
      { value: "README.md", label: "README.md" },
    ],
  },
})

interface NodeProps {
  node: File
  indexPath: number[]
  checkable?: boolean | undefined
}

function Check(props: { label: string }) {
  return (
    <TreeView.Node.Checkbox aria-label={props.label}>
      <TreeView.Node.Checkbox.Indicator indeterminate="some" fallback="none">
        all
      </TreeView.Node.Checkbox.Indicator>
    </TreeView.Node.Checkbox>
  )
}

function Node(props: NodeProps) {
  return (
    <TreeView.Node.Provider node={props.node} indexPath={props.indexPath}>
      <Show
        when={props.node.children}
        fallback={
          <TreeView.Item>
            <Show when={props.checkable}>
              <Check label={props.node.label} />
            </Show>
            <TreeView.Item.Text>{props.node.label}</TreeView.Item.Text>
            <TreeView.Item.Indicator>✓</TreeView.Item.Indicator>
          </TreeView.Item>
        }
      >
        <TreeView.Branch>
          <TreeView.Branch.Control>
            <Show when={props.checkable}>
              <Check label={props.node.label} />
            </Show>
            <TreeView.Branch.Indicator>
              <TreeView.Node.Context>{(node) => <>{node().expanded ? "▾" : "▸"}</>}</TreeView.Node.Context>
            </TreeView.Branch.Indicator>
            <TreeView.Branch.Text>{props.node.label}</TreeView.Branch.Text>
          </TreeView.Branch.Control>
          <TreeView.Branch.Content>
            <TreeView.Branch.IndentGuide />
            <For each={props.node.children}>
              {(child, index) => (
                <Node node={child} indexPath={[...props.indexPath, index()]} checkable={props.checkable} />
              )}
            </For>
          </TreeView.Branch.Content>
        </TreeView.Branch>
      </Show>
    </TreeView.Node.Provider>
  )
}

function Nodes(props: { checkable?: boolean | undefined }) {
  return (
    <>
      <TreeView.Label>Files</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children}>
          {(node, index) => <Node node={node} indexPath={[index()]} checkable={props.checkable} />}
        </For>
      </TreeView.Tree>
    </>
  )
}

function Basic(props: Omit<TreeView.RootProps, "collection"> & { checkable?: boolean | undefined }) {
  return (
    <TreeView.Root collection={collection} {...omit(props, "checkable")}>
      <Nodes checkable={props.checkable} />
    </TreeView.Root>
  )
}

const tree = () => page.getByRole("tree", { name: "Files" })
const item = (name: string) => page.getByRole("treeitem", { name, exact: true })
// A branch's name runs on with the names of its visible children
const branch = (name: string) => page.getByRole("treeitem", { name: new RegExp(`^${name}`) })
const control = (name: string) => page.getByRole("button", { name, exact: true })
const checkbox = (name: string) => page.getByRole("checkbox", { name, exact: true })
const branchContent = (value: string) =>
  document.querySelector(`[data-scope="tree-view"][data-part="branch-content"][data-value="${value}"]`)

test("expands and collapses a branch from a click on its control", async () => {
  render(() => <Basic />)

  await expect.element(tree()).toBeVisible()
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "false")
  await expect.element(item("app.tsx")).not.toBeInTheDocument()

  await userEvent.click(control("src"))
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "true")
  await expect.element(control("src")).toHaveTextContent("▾")
  await expect.element(page.getByRole("group")).toBeVisible()
  await expect.element(item("app.tsx")).toHaveAttribute("aria-level", "2")
  await expect.element(item("package.json")).toHaveAttribute("aria-level", "1")

  await userEvent.click(control("src"))
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "false")
  await expect.element(control("src")).toHaveTextContent("▸")
  await expect.element(item("app.tsx")).not.toBeInTheDocument()
})

test("expands with ArrowRight and collapses with ArrowLeft, moving between a branch and its children", async () => {
  render(() => <Basic />)

  await userEvent.tab()
  await expect.element(control("src")).toHaveFocus()

  await userEvent.keyboard("{ArrowRight}")
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "true")
  await userEvent.keyboard("{ArrowRight}")
  await expect.element(item("app.tsx")).toHaveFocus()

  await userEvent.keyboard("{ArrowLeft}")
  await expect.element(control("src")).toHaveFocus()
  await userEvent.keyboard("{ArrowLeft}")
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "false")
})

test("moves focus with ArrowDown and ArrowUp, skipping the children of collapsed branches", async () => {
  render(() => <Basic defaultExpandedValue={["src"]} />)

  await userEvent.tab()
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(item("app.tsx")).toHaveFocus()
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(control("utils")).toHaveFocus()
  await userEvent.keyboard("{ArrowDown}")
  await expect.element(item("package.json")).toHaveFocus()

  await userEvent.keyboard("{ArrowUp}")
  await expect.element(control("utils")).toHaveFocus()
})

test("selects one node at a time and reports the selection", async () => {
  const onSelectionChange = vi.fn()
  render(() => <Basic onSelectionChange={onSelectionChange} />)

  await userEvent.click(item("package.json"))
  await expect.element(item("package.json")).toHaveAttribute("aria-selected", "true")
  await expect.element(item("package.json").getByText("✓")).toBeVisible()
  expect(onSelectionChange).toHaveBeenLastCalledWith(expect.objectContaining({ selectedValue: ["package.json"] }))

  await userEvent.click(item("README.md"))
  await expect.element(item("README.md")).toHaveAttribute("aria-selected", "true")
  await expect.element(item("package.json")).toHaveAttribute("aria-selected", "false")
  await expect.element(item("package.json").getByText("✓")).not.toBeVisible()
})

test("adds to the selection with Ctrl in multiple selection mode", async () => {
  render(() => <Basic selectionMode="multiple" />)

  await expect.element(tree()).toHaveAttribute("aria-multiselectable", "true")
  await userEvent.click(item("package.json"))
  await userEvent.click(item("README.md"), { modifiers: ["Control"] })
  await expect.element(item("package.json")).toHaveAttribute("aria-selected", "true")
  await expect.element(item("README.md")).toHaveAttribute("aria-selected", "true")
})

test("follows `expandedValue` and `selectedValue` when controlled", async () => {
  const [expanded, setExpanded] = createSignal<string[]>([])
  const [selected, setSelected] = createSignal<string[]>([])
  const onExpandedChange = vi.fn()
  render(() => (
    <Basic
      expandedValue={expanded()}
      onExpandedChange={onExpandedChange}
      selectedValue={selected()}
      onSelectionChange={(details) => setSelected(details.selectedValue)}
    />
  ))

  await userEvent.click(control("src"))
  expect(onExpandedChange).toHaveBeenLastCalledWith(expect.objectContaining({ expandedValue: ["src"] }))
  await expect.element(branch("src")).toHaveAttribute("aria-expanded", "false")

  setExpanded(["src", "utils"])
  await expect.element(item("format.ts")).toHaveAttribute("aria-level", "3")

  setSelected(["format.ts"])
  await expect.element(item("format.ts")).toHaveAttribute("aria-selected", "true")
})

test("checks a branch with its descendants and shows its parent as indeterminate", async () => {
  const onCheckedChange = vi.fn()
  render(() => <Basic checkable defaultExpandedValue={["src", "utils"]} onCheckedChange={onCheckedChange} />)

  await userEvent.click(checkbox("utils"))
  await expect.element(checkbox("utils")).toBeChecked()
  await expect.element(checkbox("format.ts")).toBeChecked()
  await expect.element(checkbox("src")).toBePartiallyChecked()
  await expect.element(checkbox("utils")).toHaveTextContent("all")
  await expect.element(checkbox("src")).toHaveTextContent("some")
  expect(onCheckedChange).toHaveBeenLastCalledWith({ checkedValue: ["format.ts"] })

  await userEvent.click(checkbox("utils"))
  await expect.element(checkbox("src")).not.toBeChecked()
  await expect.element(checkbox("src")).toHaveTextContent("none")
})

test("mounts branch content as the root's lazyMount and unmountOnExit say", async () => {
  render(() => <Basic lazyMount unmountOnExit />)

  expect(branchContent("src")).toBeNull()

  await userEvent.click(control("src"))
  await expect.poll(() => branchContent("src")).not.toBeNull()

  await userEvent.click(control("src"))
  await expect.poll(() => branchContent("src")).toBeNull()
})

test("RootProvider renders a tree view driven from outside through useTreeView", async () => {
  function External() {
    const api = useTreeView({ collection })
    return (
      <>
        <button type="button" onClick={() => api().expand()}>
          Expand all
        </button>
        <TreeView.RootProvider value={api}>
          <Nodes />
          <TreeView.Context>{(api) => <p>{api().expandedValue.length} expanded</p>}</TreeView.Context>
        </TreeView.RootProvider>
      </>
    )
  }
  render(() => <External />)

  await userEvent.click(page.getByRole("button", { name: "Expand all" }))
  await expect.element(item("format.ts")).toBeVisible()
  await expect.element(page.getByText("2 expanded")).toBeVisible()
})
