import { getLocaleDir } from "@zag-js/i18n-utils"
import { createMemo, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { LocaleContextProvider, type LocaleContext } from "./use-locale-context.js"

export interface LocaleProviderProps {
  /** A BCP 47 language tag, such as "fr-FR". The machines inside read and write numbers in it */
  locale: string
  children?: Element
}

/** Gives the machines inside a locale, and the direction its script is written in */
export function LocaleProvider(props: LocaleProviderProps): Element {
  const context = createMemo((): LocaleContext => ({ locale: props.locale, dir: getLocaleDir(props.locale) }))
  return provide(LocaleContextProvider, context, () => props.children)
}
