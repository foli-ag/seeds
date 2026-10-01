import type { Accessor } from "solid-js"

export type MaybeAccessor<T> = T | Accessor<T>

/** Makes the keys `K` of `T` optional */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export function access<T>(value: MaybeAccessor<T>): T {
  return typeof value === "function" ? (value as Accessor<T>)() : value
}
