import type * as pinInput from "@zag-js/pin-input"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { usePinInputContext } from "./use-pin-input-context.js"

export type PinInputInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As, pinInput.InputProps>

/** The field for the character at `index` */
export function PinInputInput<As extends ValidComponent = "input">(props: PinInputInputProps<As>): Element {
  const [inputProps, localProps] = splitProps(props, ["index"])
  const api = usePinInputContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(inputProps), localProps),
  )
}
