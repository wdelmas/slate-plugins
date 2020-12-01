import castArray from 'lodash/castArray';
import { Ancestor, Editor, NodeEntry, Path } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
import { getParent } from './getParent';

/**
 * Get the block above a location (default: selection) by type.
 */
export const getAboveByType = (
  editor: Editor,
  types: string[] | string,
  options: Omit<EditorAboveOptions, 'match'> = {},
  isRecursive?: boolean
): NodeEntry<Ancestor> | undefined => {
  types = castArray<string>(types);
  const aboveElem = Editor.above(editor, {
    match: (n) => types.includes(n.type as string),
    ...options,
  });

  if (aboveElem) {
    return aboveElem;
  }

  if (isRecursive && options.at) {
    const parentElem = getParent(editor, options.at);
    if (parentElem) {
      return getAboveByType(
        editor,
        types,
        { at: Path.parent(options.at as Path) },
        true
      );
    }
  }
  return undefined;
};
