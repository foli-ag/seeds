import type { PropTypes } from "@foliag/zag"
import * as passwordInput from "@zag-js/password-input"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UsePasswordInputProps extends Optional<Omit<passwordInput.Props, "dir" | "getRootNode">, "id"> {}

export type UsePasswordInputReturn = Accessor<passwordInput.Api<PropTypes>>

export function usePasswordInput(props: MaybeAccessor<UsePasswordInputProps> = {}): UsePasswordInputReturn {
  return useApi(passwordInput.machine, passwordInput.connect, props)
}
