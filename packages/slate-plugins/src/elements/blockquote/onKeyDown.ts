import isHotkey from 'is-hotkey';
import { add, remove } from 'lodash';
import { Editor } from 'slate';
import { isNodeTypeIn, setDefaults } from '../..';
import {
  addBlockquote,
  BlockQuoteOptions,
  DEFAULTS_BLOCKQUOTE,
  removeBlockquote,
} from '.';

export const onKeyDown = (options?: BlockQuoteOptions) => (
  e: KeyboardEvent,
  editor: Editor
) => {
  const { blockquote } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  const { hotkey } = blockquote;
  if (hotkey && isHotkey(hotkey, e)) {
    e.preventDefault();

    const active = isNodeTypeIn(editor, blockquote.type);
    if (active) {
      removeBlockquote(editor, options);
    } else {
      addBlockquote(editor, options);
    }
  }
};
