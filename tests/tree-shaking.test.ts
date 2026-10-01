// Apps bundle the library with Vite. These tests compile it the way it is published, bundle small apps against it
// and check what the apps keep.
import { execFileSync } from "node:child_process"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { build, type Rolldown } from "vite"
import pkg from "../package.json" with { type: "json" }

let library: string

beforeAll(async () => {
  library = await mkdtemp(join(tmpdir(), "seeds-"))
  const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc")
  const project = resolve(import.meta.dirname, "../tsconfig.build.json")
  execFileSync(process.execPath, [tsc, "-p", project, "--outDir", library])
  await writeFile(join(library, "package.json"), JSON.stringify({ type: "module", sideEffects: pkg.sideEffects }))
  return () => rm(library, { recursive: true })
}, 60_000)

const machines = Object.keys(pkg.dependencies).filter(
  (name) =>
    name.startsWith("@zag-js/") && !["core", "types", "utils", "presence", "collection"].includes(name.slice(8)),
)

test("brings in no other component than the one imported", async () => {
  const code = await bundle(`import { Dialog } from "seeds/dialog"; export default Dialog.Root`)

  const imported = machines.filter((name) => code.includes(`"${name}"`))
  expect(imported).toEqual(["@zag-js/dialog"])
})

test("leaves out the parts an app does not use", async () => {
  const rootOnly = await bundle(`import { Dialog } from "seeds/dialog"; export default Dialog.Root`)
  const withTitle = await bundle(`import { Dialog } from "seeds/dialog"; export default [Dialog.Root, Dialog.Title]`)

  expect(rootOnly).not.toContain("getTitleProps")
  expect(withTitle).toContain("getTitleProps")
})

/** Bundles an app whose `entry` imports subpaths of the library as "seeds/...", leaving the dependencies as imports */
async function bundle(entry: string): Promise<string> {
  const app = join(library, "app.js")
  await writeFile(app, entry.replace(/"seeds\/([\w-]+)"/g, '"./$1/index.js"'))
  const [output] = (await build({
    configFile: false,
    logLevel: "silent",
    build: {
      write: false,
      minify: false,
      lib: { entry: app, formats: ["es"] },
      rolldownOptions: {
        external: (id) => !id.startsWith(".") && !id.startsWith("/"),
        // Every dependency declares itself free of side effects, as the library does
        treeshake: { moduleSideEffects: "no-external" },
      },
    },
  })) as Rolldown.RolldownOutput[]
  return output!.output[0].code
}
