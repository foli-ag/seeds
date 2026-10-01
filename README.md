# @foliag/bloom

Unstyled Solid 2 components built on [Zag.js](https://zagjs.com) machines through
[@foliag/zag](https://github.com/foli-ag/zag). They have the parts of [Ark UI](https://ark-ui.com), renamed as
[NAMING.md](NAMING.md) describes. Bloom renders the markup, ARIA attributes and `data-*` state. The app styles it.

```sh
bun add @foliag/bloom
```

```tsx
import { Dialog } from "@foliag/bloom/dialog"

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Delete file</Dialog.Title>
      <Dialog.Trigger.Close>Close</Dialog.Trigger.Close>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

Every part takes an `asChild` function to render your own element with the part's props merged in. Each component
also exports `use<Name>` and `use<Name>Context` hooks, a `RootProvider` for a machine created with the hook, and a
`Context` part that renders its children with the API.

## Components

Each one is a subpath export, such as `@foliag/bloom/radio-group`, and the root entry re-exports them all.

| Bloom | Former bloom name | Zag.js machine |
|---|---|---|
| `Accordion` | `Accordion` | accordion, collapsible |
| `Avatar` | `Avatar` | avatar |
| `Checkbox` | `Checkbox` | checkbox |
| `Collapsible` | `Collapsible` | collapsible |
| `Combobox` | `Combobox` | combobox |
| `Dialog` | `Dialog`, and `AlertDialog` as `<Dialog.Root role="alertdialog">` | dialog |
| `Menu` | `DropdownMenu` | menu |
| `NavigationMenu` | `NavigationMenu` | navigation-menu |
| `Popover` | `Popover` | popover |
| `RadioGroup` | `RadioGroup` | radio-group |
| `Select` | `Select` | select |
| `Slider` | `Slider` | slider |
| `Steps` | `Stepper` | steps |
| `Switch` | `Switch` | switch |
| `ToggleGroup` | `ToggleGroup` | toggle-group |

Select and Combobox take a collection from `createListCollection`, exported next to them.

## Tree-shaking

The build compiles each source file to its own module, so an app's bundler keeps only the parts it uses.
`tests/tree-shaking.test.ts` bundles small apps with Vite to check it. A part keeps its nested members: using
`Dialog.Trigger` also brings `Dialog.Trigger.Close`.

## Sources without JSX

Parts render through Solid's `dynamic()` and `createComponent`, never JSX. The published JavaScript then needs no
Solid compiler and renders on the server as well as in the browser. Tests use JSX.

## Development

The flake provides Bun, Node and the Chromium build that Playwright drives. Run `direnv allow` once, or enter the shell
with `nix develop`.

```sh
bun install
bun run test        # Vitest: components in headless Chromium, the tree-shaking check in Node
bun run typecheck
bun run build       # tsc, one module and declaration per source file in dist/
bun run format      # biome
```

The tests run in a real browser because positioning, focus trapping and outside clicks do nothing useful in jsdom.
Playwright only drives browsers from its own release, so the `playwright` devDependency stays at the version of
`playwright-driver` in the locked nixpkgs. Update both together.

`nix flake check` builds the package and runs the typecheck and the tests in the sandbox. After changing `bun.lock`,
set `outputHash` of `bunDeps` in `nix/package.nix` to `lib.fakeHash`, run `nix build` and paste the hash it reports.

## License

MIT
