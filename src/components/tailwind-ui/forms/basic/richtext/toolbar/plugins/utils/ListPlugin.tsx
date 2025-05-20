import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import type { ReactNode } from 'react';

import { TranslationsText } from '../../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../../internationalization/useTranslation';
import { useRichTextContext } from '../../../context/RichTextContext';
import { ToolbarPluginButton } from '../../ToolbarPlugin';
import type { TooltipPluginElement } from '../../types';

interface FormatPluginProps {
  pluginKey: 'ul' | 'ol';
  icon: ReactNode;
}

const tooltipTranslations: Record<'ol' | 'ul', string> = {
  ol: 'richtext.toolbar.list.ol',
  ul: 'richtext.toolbar.list.ul',
};

export default function ListPlugin(
  props: FormatPluginProps,
): TooltipPluginElement {
  const { pluginKey, icon } = props;

  const [state] = useRichTextContext();

  const olLabel = useTranslation('richtext.toolbar.list.ol.label');
  const ulLabel = useTranslation('richtext.toolbar.list.ul.label');

  function onClick() {
    if (!state.activeEditor) {
      return;
    }

    if (state.blockType === pluginKey) {
      state.activeEditor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      state.activeEditor.dispatchCommand(
        pluginKey === 'ul'
          ? INSERT_UNORDERED_LIST_COMMAND
          : INSERT_ORDERED_LIST_COMMAND,
        undefined,
      );
    }
  }

  return (
    <ToolbarPluginButton
      onClick={onClick}
      label={pluginKey === 'ul' ? ulLabel : olLabel}
      tooltip={<TranslationsText textKey={tooltipTranslations[pluginKey]} />}
      variant={state.blockType === pluginKey ? 'secondary' : 'white'}
    >
      {icon}
    </ToolbarPluginButton>
  );
}
