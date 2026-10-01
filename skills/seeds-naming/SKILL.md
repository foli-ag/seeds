---
name: seeds-naming
description: How the parts of @foliag/seeds compound components are named, nested, exported and split into files, with the mapping from Ark UI's part names. Use when adding a component or a part to seeds, when translating an Ark UI example to seeds, or when reviewing part names.
---

# Seeds part naming

How the parts of a seeds compound component are named and exported. Seeds builds on Zag.js and follows Ark UI's parts.
The Svelte bloom (bits-ui) predates it and differs (e.g. `Dialog.Close`). `Command` has no Ark part and is out of scope
until it is built.

The goal is guidance while typing: `Dialog.Trigger.` lists everything that acts as a trigger, and `Select.Item.` lists
everything that lives in an item, without knowing a name beforehand.

## Rules

1. **Nest by Ark's name, as deep as it goes.** Split a compound name at each entity it belongs to; the remaining words
   are the member name. There is no fixed list of namespaces and no depth cap: `ArrowTip` → `Arrow.Tip`, `ItemText` →
   `Item.Text`, `BranchControl` → `Branch.Control`, `NodeCheckboxIndicator` → `Node.Checkbox.Indicator`. A compound
   noun stays one word (`IndentGuide`, `ValueText`).
2. **Triggers that act on the root's state nest under `Trigger`,** whatever Ark's name: `Trigger.Open`,
   `Trigger.Close`, `Trigger.Clear`, `Trigger.Context`, `Trigger.Prev`, `Trigger.Next`. A trigger owned by an item or
   branch follows rule 1 instead: `Item.Trigger`, `Branch.Trigger`.
3. **`Trigger` and `Trigger.Open` are the same component** (same reference,
   `Object.assign(Trigger, { Open: Trigger, ... })`). The bare form is canonical and used in examples. This is the only
   alias; no other part is exported under two names. Where the root has nothing to open (Steps), `Trigger` is a
   namespace with no bare form, and `<Steps.Trigger>` is a type error.
4. **`Item` holds two kinds of members.** What lives inside an item: `Item.Text`, `Item.Indicator`, `Item.Trigger`,
   `Item.Content`. And kinds of item, each replacing a plain `Item`: `Item.Checkbox`, `Item.Radio`, `Item.Submenu`.
   Steps' step button is unprefixed in Ark but sits inside the item, so it is `Steps.Item.Trigger`.
5. **`Group` replaces `ItemGroup`; its label is `Group.Label`** (from `ItemGroupLabel`; the `Item` prefix is dropped, an
   exception to rule 1). A group of radio items is `Group.Radio` (from `RadioItemGroup`).
6. **Everything else keeps Ark's name:** `Root`, `Content`, `Positioner`, `Backdrop`, `Control`, `Label`, `Title`,
   `Description`, `Input`, `Indicator`, `Separator`, `List`, `Empty`, `ValueText`, `Anchor`. A part does not nest
   just because it has to sit inside another. Steps' `Indicator` and `Separator` read the item around them and stay
   flat, and so do Slider's `HiddenInput` and `DraggingIndicator` inside a thumb. Only rules 2 and 4 move a part Ark
   leaves unprefixed.
7. **Parts are never folded.** `Backdrop`, `Positioner` and `Content` stay separate parts, each with its own props for
   configuration. No part renders several of them.
8. **The DOM contract is zag's and never renamed.** `data-scope` / `data-part` keep zag's values, kebab-cased from the
   anatomy key (`closeTrigger` renders `data-part="close-trigger"`). Selectors, tests and zag's docs keep working
   whatever the exported name. A part zag's anatomy lacks, like Combobox's `Empty`, sets them the same way.
9. **No flat duplicates.** `Dialog.CloseTrigger` does not exist next to `Dialog.Trigger.Close`.

## Mapping (Ark → seeds)

Part lists checked against Ark's docs (Dialog, Popover, Select, Combobox, Accordion, Menu, Steps on 2026-09-30;
TreeView on 2026-10-01). The RadioGroup, NavigationMenu and Slider rows were added when those components were built,
on 2026-10-01.

| Ark | seeds |
|---|---|
| `Dialog.Trigger` | `Dialog.Trigger` (= `Dialog.Trigger.Open`) |
| `Dialog.CloseTrigger`, `Popover.CloseTrigger` | `Trigger.Close` |
| `Select.ClearTrigger`, `Combobox.ClearTrigger` | `Trigger.Clear` |
| `Menu.ContextTrigger` | `Trigger.Context` |
| `Steps.PrevTrigger`, `Steps.NextTrigger` | `Trigger.Prev`, `Trigger.Next` |
| `Steps.Trigger` (the step button), `NavigationMenu.Trigger` (only works inside an item) | `Item.Trigger` |
| `Popover.ArrowTip`, `Menu.ArrowTip` | `Arrow.Tip` |
| `Select.ItemGroup`, `Combobox.ItemGroup`, `Menu.ItemGroup` | `Group` |
| `Select.ItemGroupLabel`, `Combobox.ItemGroupLabel`, `Menu.ItemGroupLabel` | `Group.Label` |
| `Select.ItemText`, `Combobox.ItemText`, `Menu.ItemText`, `RadioGroup.ItemText`, `TreeView.ItemText` | `Item.Text` |
| `Select.ItemIndicator`, `Combobox.ItemIndicator`, `Menu.ItemIndicator`, `Accordion.ItemIndicator`, `NavigationMenu.ItemIndicator`, `TreeView.ItemIndicator` | `Item.Indicator` |
| `Accordion.ItemContext`, `Select.ItemContext`, `Combobox.ItemContext`, `Menu.ItemContext`, `RadioGroup.ItemContext`, `Steps.ItemContext` | `Item.Context` |
| `RadioGroup.ItemControl`, `RadioGroup.ItemHiddenInput` | `Item.Control`, `Item.HiddenInput` |
| `Accordion.ItemTrigger` | `Item.Trigger` |
| `Accordion.ItemContent` | `Item.Content` |
| `Menu.CheckboxItem` | `Item.Checkbox` |
| `Menu.RadioItem` | `Item.Radio` |
| `Menu.RadioItemGroup` | `Group.Radio` |
| `Menu.TriggerItem` (item that opens a submenu) | `Item.Submenu` |
| `NavigationMenu.ViewportPositioner` | `Viewport.Positioner` |
| `Slider.HiddenInput`, `Slider.DraggingIndicator`, `Slider.MarkerGroup` | unchanged (rule 6) |
| `TreeView.BranchControl` | `Branch.Control` |
| `TreeView.BranchIndicator`, `BranchText`, `BranchTrigger`, `BranchContent` | `Branch.Indicator`, `Branch.Text`, `Branch.Trigger`, `Branch.Content` |
| `TreeView.BranchIndentGuide` | `Branch.IndentGuide` |
| `TreeView.NodeCheckbox` | `Node.Checkbox` |
| `TreeView.NodeCheckboxIndicator` | `Node.Checkbox.Indicator` |

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Trigger.Close>Close</Dialog.Trigger.Close>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Files

Every part has its own file in `src/<component>/`, named after its seeds path: `dialog-trigger-close.ts`,
`tree-view-branch-control.ts`. The function and its props type take the same path, `DialogTriggerClose` and
`DialogTriggerCloseProps`. Next to the parts:

- `use-<component>.ts` holds the `use<Component>` hook and its props and return types.
- `use-<component>-context.ts` holds the Solid context, named `<Component>Provider` because in Solid 2 the context is
  its own provider, and the `use<Component>Context` hook. The `Context` part keeps the name `<Component>Context`.
- `<component>.ts` assembles the namespace from the part files and nothing else. It renames each part and its props
  type to the path inside the namespace (`Trigger`, `TriggerCloseProps`).
- `index.ts` exports the namespace with `export * as Dialog from "./dialog.js"`, plus the hooks. It is the
  component's subpath in `package.json` `exports`, `@foliag/seeds/dialog`. There is no root entry re-exporting the
  components: a server and a dev server do not tree-shake, and would load all of them.

A part that renders an element types its props as `PolymorphicProps<As, P>` with `As extends ValidComponent` defaulting to its
own tag, so `as` can swap the element or pass a component.

## Implementation notes

- Static members on the component, nested as deep as the name goes: `Object.assign(Trigger, { Open: Trigger, Close:
  CloseTrigger })`, `Object.assign(NodeCheckbox, { Indicator: NodeCheckboxIndicator })`. Type them so every level shows
  in autocomplete, and mark the call `/* @__PURE__ */` so bundlers can drop it.
- A namespace with no bare form, like Steps' `Trigger`, is a module of its own (`steps-trigger.ts` re-exporting `Prev`
  and `Next`) exported with `export * as Trigger`. It costs nothing in the bundle.
- Measured once the first components existed: an app keeps only the parts it uses, except that a part brings its
  static members along. Using `Dialog.Trigger` also keeps `Dialog.Trigger.Close`. `tests/tree-shaking.test.ts` guards
  the rest.
