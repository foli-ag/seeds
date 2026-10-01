import * as checkbox from "@zag-js/checkbox"
import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCheckbox, type UseCheckboxProps } from "./use-checkbox.js"
import { CheckboxProvider } from "./use-checkbox-context.js"

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
