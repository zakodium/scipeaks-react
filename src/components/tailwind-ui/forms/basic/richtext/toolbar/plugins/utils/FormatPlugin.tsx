import type { TextFormatType } from 'lexical';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import type { ReactNode } from 'react';

import { TranslationsText } from '../../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../../internationalization/useTranslation';
import type { ActionPayload } from '../../../../../../types';
import { useRichTextContext } from '../../../context/RichTextContext';
import type {
  RichTextActions,
  RichTextFormatType,
} from '../../../context/RichTextProvider';
import { ToolbarPluginButton } from '../../ToolbarPlugin';
import type { TooltipPluginElement } from '../../types';

interface FormatPluginProps {
  pluginKey: string;
  icon: ReactNode;
}

const tooltipTranslations: Record<RichTextFormatType, string> = {
  bold: 'richtext.toolbar.text.format.bold',
  italic: 'richtext.toolbar.text.format.italic',
  subscript: 'richtext.toolbar.text.format.subscript',
  superscript: 'richtext.toolbar.text.format.superscript',
  underline: 'richtext.toolbar.text.format.underline',
};

const labelTranslations: Record<RichTextFormatType, string> = {
  bold: 'richtext.toolbar.text.format.bold.label',
  italic: 'richtext.toolbar.text.format.italic.label',
  subscript: 'richtext.toolbar.text.format.subscript.label',
  superscript: 'richtext.toolbar.text.format.superscript.label',
  underline: 'richtext.toolbar.text.format.underline.label',
};

export default function FormatPlugin(
  props: FormatPluginProps,
): TooltipPluginElement {
  const { pluginKey, icon } = props;

  const [state, dispatch] = useRichTextContext();

  const label = useTranslation(
    labelTranslations[pluginKey as RichTextFormatType],
  );

  function onClick() {
    const textFormatKey = pluginKey as TextFormatType;
    const richTextFormatKey = pluginKey as RichTextFormatType;

    if (!state.activeEditor) {
      return;
    }

    state.activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, textFormatKey);

    const changedToolbar: ActionPayload<RichTextActions, 'CHANGE_TOOLBAR'> = {
      type: richTextFormatKey,
      value: !state[richTextFormatKey],
    };

    dispatch({
      type: 'CHANGE_TOOLBAR',
      payload: changedToolbar,
    });
  }

  return (
    <ToolbarPluginButton
      label={label}
      onClick={onClick}
      tooltip={
        <TranslationsText
          textKey={tooltipTranslations[pluginKey as RichTextFormatType]}
        />
      }
      variant={!state[pluginKey as RichTextFormatType] ? 'white' : 'secondary'}
    >
      {icon}
    </ToolbarPluginButton>
  );
}
