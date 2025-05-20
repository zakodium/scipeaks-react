import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import type { ReactNode } from 'react';

import { TranslationsText } from '../../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../../internationalization/useTranslation';
import { useRichTextContext } from '../../../context/RichTextContext';
import { ToolbarPluginButton } from '../../ToolbarPlugin';
import type { TooltipPluginElement } from '../../types';

interface TextPluginProps {
  pluginKey: 'h1' | 'h2' | 'h3' | 'paragraph';
  icon: ReactNode;
}

const labelTranslation: Record<TextPluginProps['pluginKey'], string> = {
  h1: 'richtext.toolbar.text.style.h1.label',
  h2: 'richtext.toolbar.text.style.h2.label',
  h3: 'richtext.toolbar.text.style.h3.label',
  paragraph: 'richtext.toolbar.text.style.paragraph.label',
};

const tooltipTranslation: Record<TextPluginProps['pluginKey'], string> = {
  h1: 'richtext.toolbar.text.style.h1',
  h2: 'richtext.toolbar.text.style.h2',
  h3: 'richtext.toolbar.text.style.h3',
  paragraph: 'richtext.toolbar.text.style.paragraph',
};

export default function TextPlugin(
  props: TextPluginProps,
): TooltipPluginElement {
  const { icon, pluginKey } = props;

  const label = useTranslation(labelTranslation[pluginKey]);
  const [state] = useRichTextContext();

  function onClick() {
    if (!state.activeEditor) {
      return;
    }

    state.activeEditor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () =>
          pluginKey === 'paragraph'
            ? $createParagraphNode()
            : $createHeadingNode(pluginKey),
        );
      }
    });
  }

  return (
    <ToolbarPluginButton
      label={label}
      onClick={onClick}
      tooltip={<TranslationsText textKey={tooltipTranslation[pluginKey]} />}
      variant={state.blockType === pluginKey ? 'secondary' : 'white'}
    >
      {icon}
    </ToolbarPluginButton>
  );
}
