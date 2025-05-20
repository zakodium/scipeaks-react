import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import type { ReactNode } from 'react';

import { TranslationsText } from '../../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../../internationalization/useTranslation';
import { useRichTextContext } from '../../../context/RichTextContext';
import { ToolbarPluginButton } from '../../ToolbarPlugin';
import type { TooltipPluginElement } from '../../types';

type Alignment = 'center' | 'right' | 'left' | 'justify';

interface FormatAlignmentPluginProps {
  pluginKey: Alignment;
  icon: ReactNode;
}

const labelTranslation: Record<Alignment, string> = {
  center: 'richtext.toolbar.text.alignment.center.label',
  right: 'richtext.toolbar.text.alignment.right.label',
  left: 'richtext.toolbar.text.alignment.left.label',
  justify: 'richtext.toolbar.text.alignment.justify.label',
};

const tooltipTranslation: Record<Alignment, string> = {
  center: 'richtext.toolbar.text.alignment.center',
  right: 'richtext.toolbar.text.alignment.right',
  left: 'richtext.toolbar.text.alignment.left',
  justify: 'richtext.toolbar.text.alignment.justify',
};

export default function FormatAlignmentPlugin(
  props: FormatAlignmentPluginProps,
): TooltipPluginElement {
  const { pluginKey, icon } = props;

  const label = useTranslation(labelTranslation[pluginKey]);
  const [state, dispatch] = useRichTextContext();

  function onClick() {
    if (!state.activeEditor) {
      return;
    }

    state.activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, pluginKey);
    dispatch({ type: 'CHANGE_ALIGNMENT', payload: pluginKey });
  }

  return (
    <ToolbarPluginButton
      label={label}
      onClick={onClick}
      tooltip={<TranslationsText textKey={tooltipTranslation[pluginKey]} />}
      variant={state.blockAlignment === pluginKey ? 'secondary' : 'white'}
    >
      {icon}
    </ToolbarPluginButton>
  );
}
