import * as editable from "@zag-js/editable"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useEditable, type UseEditableProps } from "./use-editable.js"
import { EditableProvider } from "./use-editable-context.js"

export type EditableRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseEditableProps>

export function EditableRoot<As extends ValidComponent = "div">(props: EditableRootProps<As>): Element {
  const [editableProps, localProps] = splitProps(props, editable.props)
  const api = useEditable(editableProps)
  return provide(EditableProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
