import type { ResizeTriggerProps } from "@zag-js/splitter"
import { createContext, useContext } from "solid-js"

/** The props of the resize trigger around the caller, which its indicator passes back to the splitter */
export const SplitterResizeTriggerPropsProvider = /* @__PURE__ */ createContext<ResizeTriggerProps>()

export const useSplitterResizeTriggerPropsContext = (): ResizeTriggerProps =>
  useContext(SplitterResizeTriggerPropsProvider)
