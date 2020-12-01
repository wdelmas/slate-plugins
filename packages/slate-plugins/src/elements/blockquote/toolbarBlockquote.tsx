import React from 'react';
import { useSlate } from 'slate-react';
import {
  getPreventDefaultHandler,
  isNodeTypeIn,
  setDefaults,
  ToolbarButton,
} from '../..';
import { addBlockquote, DEFAULTS_BLOCKQUOTE, removeBlockquote } from '..';

export const ToolbarBlockquote = ({ ...props }: any) => {
  const { blockquote } = setDefaults(props, DEFAULTS_BLOCKQUOTE);

  const editor = useSlate();
  const active = isNodeTypeIn(editor, blockquote.type);
  return (
    <ToolbarButton
      active={active}
      onMouseDown={getPreventDefaultHandler(
        active ? removeBlockquote : addBlockquote,
        editor,
        props
      )}
      {...props}
    />
  );
};
