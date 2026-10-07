import { createContext, useContext, type Accessor } from "solid-js"

/** The locale of the nearest `LocaleProvider` and the direction its script is written in */
export interface LocaleContext {
  /** A BCP 47 language tag, such as "fr-FR" */
  locale: string
  /** The direction of the locale's script */
  dir: "ltr" | "rtl"
}

/** The locale of the nearest `LocaleProvider` */
export function useLocaleContext(): Accessor<LocaleContext> {
  return useContext(LocaleContextProvider)
}

// Outside a provider, machines read and write numbers in zag's default locale, left to right
export const LocaleContextProvider = /* @__PURE__ */ createContext<Accessor<LocaleContext>>(() => ({
  locale: "en-US",
  dir: "ltr",
}))
