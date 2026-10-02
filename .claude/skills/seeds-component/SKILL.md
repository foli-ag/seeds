---
name: seeds-component
description: How to add a component to @foliag/seeds on top of a Zag.js machine, from reading Ark UI's parts to the pull request, with the testing traps found so far. Use when adding or porting a component, or when reviewing a component pull request.
---

# Adding a seeds component

Seeds wraps a zag machine in Ark UI's parts, named by the rules in `skills/seeds-naming/SKILL.md`. This skill lives
under `.claude/` because `skills/` ships in the npm package and this one is for contributors only.

## Before writing code

- Read `skills/seeds-naming/SKILL.md` and follow it exactly.
- Read Ark's parts for the component from the `@ark-ui/solid` tarball
  (`curl -sL https://registry.npmjs.org/@ark-ui/solid/-/solid-<version>.tgz | tar xz -C <tmpdir>`), and zag's anatomy
  and `connect` in `node_modules/@zag-js/<machine>/dist`.
- Model the files on a merged component close to yours: `src/popover/` for anything positioned, `src/steps/` for a
  `Trigger` namespace with no bare form, `src/accordion/` for items with their own context, `src/slider/` for thumbs
  and hidden inputs, `src/select/` for a collection exported next to the component.

## What a component pull request touches

One branch and one pull request per component, with one commit, `feat: add <Name>`. It touches only:

- `src/<component>/` and `tests/<component>.test.tsx`
- `package.json`: the `./<component>` export, alphabetical with `./package.json` last, and the dependency, added with
  `bun add --exact @zag-js/<machine>@<the version the other @zag-js packages use>`
- `bun.lock`, which only `bun install` writes. To resolve a conflict in it, take main's and run `bun install`.

It does not touch the README, `skills/` or anything under `nix/`: the Nix build reads `bun.lock` itself. Shared code in
`src/utils/` changes only when the component cannot do without it, and the commit says why.

## Parity with Ark, and decisions for review

Match Ark's parts and behaviour. Where seeds differs, because of Solid 2, because of zag, or because seeds lacks
something Ark has, say so in the commit under a final "Decisions for review:" list, each with its reason. Common ones:

- Seeds has no Field, locale or environment provider yet, so a hook takes `dir`, `getRootNode` and the ids as plain
  props where Ark fills them from those providers.
- A part zag's anatomy lacks sets `data-scope` and `data-part` itself (naming rule 8).
- An indicator that shows its children or a `fallback` stays mounted and swaps them only when its state flips, as
  `src/toggle/toggle-indicator.ts` does.
- Bind zag's props as they come. `@foliag/zag` 0.1.1 keeps zag's `defaultValue` and `defaultChecked` in the browser,
  so an input keeps what the user types.

## Tests

Browser tests with Vitest and `@solidjs/testing-library`, of what a user does and sees, as in the existing files. Break
the code once on purpose to see a test fail, then restore it. Traps found so far:

- zag keeps one tooltip open across the page and skips the open delay while one is open, so a tooltip left open by one
  test opens the next one at once. Run delay tests first or close every tooltip.
- `userEvent.unhover` moves the pointer to the middle of the body, which can land on the element. Hover a fixed outside
  element instead, as `tests/popover.test.tsx` does with its "Outside" button.
- zag follows a hovering pointer from its second move inside the element, so move in from outside and then twice.
- Playwright does not click an element with `aria-disabled="true"`. Pass `{ force: true }` to check that a disabled
  part ignores clicks.
- Headless Chromium rejects `navigator.clipboard.writeText` with "Document is not focused". Stub it.
- `userEvent.click` can land a fraction of a pixel off in the scaled test frame. Where the position matters (an angle,
  a drag), dispatch `PointerEvent`s at exact coordinates as `tests/drawer.test.tsx` does.
- zag sets `aria-hidden` on content out of view (carousel slides), which a role query then does not find.
- zag 1.44's splitter resets an uncontrolled layout on its first measurement. Wait two animation frames after
  rendering before resizing, or control `size`.

## Checks

Through `nix develop -c`: `bun run typecheck`, `bun run test`, `bun run build`, `bun run format` (which should change
only your new files), then `nix flake check`. The flake only sees files git tracks, so `git add` new files first.
