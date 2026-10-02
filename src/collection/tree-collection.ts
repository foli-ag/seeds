import { TreeCollection, type TreeCollectionOptions, type TreeNode } from "@zag-js/collection"

export type { TreeCollection, TreeCollectionOptions, TreeNode } from "@zag-js/collection"

/** The nodes of a TreeView, with how to read each one's value, label, children and disabled state */
export function createTreeCollection<T extends TreeNode>(options: TreeCollectionOptions<T>): TreeCollection<T> {
  return new TreeCollection(options)
}
