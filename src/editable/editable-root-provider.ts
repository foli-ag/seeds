import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseEditableReturn } from "./use-editable.js"
import { EditableProvider } from "./use-editable-context.js"

export type EditableRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  {
    /** What `useEditable` returned */
    value: UseEditableReturn
  }
>

/** A root for an editable created with `useEditable`, whose API is then available outside it */
export function EditableRootProvider<As extends ValidComponent = "div">(props: EditableRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(EditableProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
