import { Editor, Transforms } from 'slate';
import { getBlockAbove } from '../../../common/queries';
import { setDefaults } from '../../../common/utils/setDefaults';
import { BlockQuoteOptions, DEFAULTS_BLOCKQUOTE } from '..';

export const addBlockquote = (editor: Editor, options?: BlockQuoteOptions) => {
  if (!editor.selection) return;
  const { p, blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);

  const selectionParentEntry = getBlockAbove(editor);
  if (!selectionParentEntry) return;

  const [] = selectionParentEntry;

  Transforms.wrapNodes(
    editor,
    {
      type: blockquote.type,
      children: [
        {
          type: p.type,
          children: [],
        },
      ],
    },
    {
      at: editor.selection,
    }
  );
};
