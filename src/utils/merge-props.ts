import { mergeProps as zagMergeProps } from "@foliag/zag"
import { merge, untrack } from "solid-js"

/**
 * `mergeProps` from `@foliag/zag`, except that refs combine instead of the last one winning,
 * so a part keeps the element it needs when the caller passes a ref of its own.
 */
export const mergeProps: typeof zagMergeProps = (...sources: any[]) => {
  // zag reads every source once to list its keys. Parts merge in their body, where Solid flags tracked reads.
  const merged = untrack(() => zagMergeProps(...(sources as [any])))
  // Solid applies a ref again whenever its identity changes, so the list is built once
  let refs: unknown[] | undefined
  return merge(merged, {
    get ref() {
      return (refs ??= untrack(() => sources.map((source) => (typeof source === "function" ? source() : source)?.ref)))
    },
  })
}
