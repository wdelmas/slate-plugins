import { Editor, Transforms } from 'slate';
import { getAboveByType } from '../../../common/queries';
import { setDefaults } from '../../../common/utils/setDefaults';
import { BlockQuoteOptions, DEFAULTS_BLOCKQUOTE } from '..';

export const removeBlockquote = (
  editor: Editor,
  options?: BlockQuoteOptions
) => {
  if (!editor.selection) return;
  if (!options?.blockquote?.type) return;

  const { p } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  const cursor = editor.selection.focus;
  const selectionParentEntry = getAboveByType(
    editor,
    options.blockquote?.type,
    { at: cursor.path },
    true
  );

  if (!selectionParentEntry) return;

  const [elem, elemPath] = selectionParentEntry;

  const defaultType = {
    type: p.type,
    children: elem.children,
  };

  // Let's add a new <p> node
  // at the current <blockquote>
  // to enriched it
  Transforms.setNodes(editor, defaultType, {
    at: [...elemPath],
  });
};
