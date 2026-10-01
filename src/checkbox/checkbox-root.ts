import * as checkbox from "@zag-js/checkbox"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { provide } from "../utils/flow"
import { mergeProps } from "../utils/merge-props"
import { splitProps } from "../utils/split-props"
import { useCheckbox, type UseCheckboxProps } from "./use-checkbox"
import { CheckboxProvider } from "./use-checkbox-context"

export interface CheckboxRootProps extends PartProps<"label", UseCheckboxProps> {}

export function CheckboxRoot(props: CheckboxRootProps): Element {
  const [checkboxProps, localProps] = splitProps(props, checkbox.props)
  const api = useCheckbox(checkboxProps)
  return provide(CheckboxProvider, api, () =>
    render(
      "label",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
