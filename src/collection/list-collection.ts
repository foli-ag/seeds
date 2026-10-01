import { ListCollection, type CollectionItem, type CollectionOptions } from "@zag-js/collection"

export type { CollectionItem, CollectionOptions, ListCollection } from "@zag-js/collection"

/** The items of a Select or Combobox, with how to read each one's value, label and disabled state */
export function createListCollection<T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> {
  return new ListCollection(options)
}
