import { omit } from "solid-js"

/**
 * Splits props into the given keys and the rest, both staying reactive. The picked object has a getter for every key,
 * including those the caller left out, which read as `undefined`.
 */
export function splitProps<T extends object, const K extends readonly PropertyKey[]>(
  props: T,
  keys: K,
): [Pick<T, K[number] & keyof T>, Omit<T, K[number]>] {
  const picked = {} as Pick<T, K[number] & keyof T>
  for (const key of keys) {
    Object.defineProperty(picked, key, {
      enumerable: true,
      get: () => props[key as keyof T],
    })
  }
  return [picked, omit(props as any, ...(keys as any)) as Omit<T, K[number]>]
}
