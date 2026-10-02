# @foliag/seeds

Unstyled Solid 2 components built on [Zag.js](https://zagjs.com) machines through
[@foliag/zag](https://github.com/foli-ag/zag). They have the parts of [Ark UI](https://ark-ui.com), with compound
names nested: Ark's `Dialog.CloseTrigger` is `Dialog.Trigger.Close`. Seeds renders the markup, ARIA attributes and
`data-*` state. The app styles it.

```sh
bun add @foliag/seeds
```

```tsx
import { Dialog } from "@foliag/seeds/dialog"

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

A part that renders an element takes `as`, as in Kobalte, to render another tag or your own component instead. The
component receives the part's props and spreads them onto its element, and the part's props are typed after it.

```tsx
<Dialog.Trigger as={Button} variant="ghost">Open</Dialog.Trigger>
<Dialog.Trigger as="a" href="#settings">Settings</Dialog.Trigger>
```

Your own components take `as` the same way when they render through `Polymorphic`:

```tsx
import { Polymorphic, type PolymorphicProps, type ValidComponent } from "@foliag/seeds/polymorphic"
import { omit } from "solid-js"

function Button<As extends ValidComponent = "button">(props: PolymorphicProps<As, { variant?: "solid" | "ghost" }>) {
  const rest = omit(props, "variant")
  return <Polymorphic as="button" data-variant={props.variant ?? "solid"} {...rest} />
}

<Button as="a" href="/docs" variant="ghost">Docs</Button>
```

The caller's `as` wins because it is spread after the default. `PolymorphicProps` types the props after it, so
`<Button href="/docs">` is a type error while `<Button as="a" href="/docs">` is not.

Each component also exports `use<Name>` and `use<Name>Context` hooks, a `RootProvider` for a machine created with the
hook, and a `Context` part that renders its children with the API.

## Components

Each one is imported from its own subpath, such as `@foliag/seeds/radio-group`. There is no root entry, so a server
or a dev server, which do not tree-shake, load only the components a page imports.

The subpaths are listed in `package.json` `exports`, each named after the zag machine the component runs. An alert
dialog is `<Dialog.Root role="alertdialog">`, as in Ark.

Select and Combobox take a collection from `createListCollection`, exported next to them. TreeView takes one from
`createTreeCollection`, exported next to it.

## Shadow roots and iframes

zag finds a component's elements by id in the page's document. A component rendered in a shadow root or an iframe
cannot find them there, and features that need them, such as moving between tabs with the arrow keys, stop working.
Wrap that part of the app in `EnvironmentProvider`, as in Ark, and the components inside look up their elements in the
root node the provider renders in.

```tsx
import { EnvironmentProvider } from "@foliag/seeds/environment"

<EnvironmentProvider>
  <App />
</EnvironmentProvider>
```

Pass `value`, a root node or a function that returns one, to name the root node yourself. Seeds calls the function only
when a machine looks up an element, in the browser, so it can return a node the server does not have. Pass the same
kind of `value` on the server and in the browser: without one, the provider renders a hidden `<span>` to find its root
node, and hydration expects it. `useEnvironmentContext()` returns an accessor to the root node with its document and
window, for an app's own code that needs them.

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

`nix flake check` builds the package and runs the typecheck and the tests in the sandbox. The build fetches each
package `bun.lock` pins with the hash the lockfile records for it, through [bun2nix](https://github.com/nix-community/bun2nix),
so changing dependencies needs nothing beyond `bun install`. Two branches that both add a dependency conflict in
`bun.lock` at most, and `bun install` resolves it.

CI runs `nix flake check` on pushes to `main` and on pull requests.

## Publishing

Releases go through npm staged publishing. CI uploads the version, and nobody can install it until a maintainer approves
it with 2FA. Publishing stays on the npm CLI because `bun publish` can neither stage a version nor attach provenance.

1. Bump `version` in `package.json`, commit, then push a matching tag.

   ```sh
   git tag v0.1.1
   git push origin v0.1.1
   ```

2. The `Publish` workflow checks the tag against `package.json`, runs `nix flake check`, and stages the tarball from
   `nix build` with provenance.
3. Approve the staged version from `nix develop`.

   ```sh
   npm stage list @foliag/seeds
   npm stage approve <stage-id>
   ```

The workflow runs in the `npm` GitHub environment and reads `NPM_TOKEN` from it. That secret is a stage-only granular
token with write access to the `@foliag` scope, so a leaked token cannot publish anything on its own. Once the package
exists you can replace it with a GitHub Actions trusted publisher on npmjs.com (organization `foli-ag`, repository
`seeds`, workflow `publish.yml`, environment `npm`) and delete the secret. Trusted publishers can always stage.

npm's manual lists an existing package as a prerequisite for `npm stage`. If staging the first version fails for that
reason, publish it once by hand from `nix develop`.

```sh
nix build
npm publish ./result/foliag-seeds-0.1.0.tgz --access public
```

## License

MIT
