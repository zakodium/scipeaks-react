import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $patchStyleText } from '@lexical/selection';
import type { LexicalEditor } from 'lexical';
import { $getSelection, $isRangeSelection } from 'lexical';

import { Bubble } from '../../../../../elements/floating-ui/bubble/Bubble';
import { useOnOff } from '../../../../../hooks/useOnOff';
import { TranslationsText } from '../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../internationalization/useTranslation';
import { ColorPicker } from '../../../color_picker';
import { useRichTextContext } from '../../context/RichTextContext';
import { ToolbarPluginButton } from '../ToolbarPlugin';
import type { TooltipPluginElement } from '../types';

export default function ColorPickerPlugin(): TooltipPluginElement {
  const [editor] = useLexicalComposerContext();
  const [state, dispatch] = useRichTextContext();

  const label = useTranslation('richtext.toolbar.text.format.textColor.label');

  const [displayColorPicker, openColorPicker, closeColorPicker] =
    useOnOff(false);

  return (
    <Bubble
      visible={displayColorPicker}
      onClickOutside={() => {
        closeColorPicker();
      }}
      placement="bottom"
      reference={
        <ToolbarPluginButton
          label={label}
          variant="white"
          tooltip={
            <TranslationsText textKey="richtext.toolbar.text.format.textColor" />
          }
          onClick={openColorPicker}
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ borderColor: state.textColor }}
            className="border-b-[3px]"
          >
            <path
              id="svg_1"
              d="m5.354,15l3.75,-10l1.792,0l3.75,10l-1.729,0l-0.896,-2.562l-4.021,0l-0.917,2.562l-1.729,0zm3.146,-4l3,0l-1.458,-4.042l-0.084,0l-1.458,4.042z"
            />
          </svg>
        </ToolbarPluginButton>
      }
    >
      <ColorPicker
        color={state.textColor}
        presetColors={[
          { color: 'red' },
          { color: 'green' },
          { color: 'blue' },
          { color: 'yellow' },
          { color: 'pink' },
          { color: 'lime' },
          { color: 'fuchsia' },
          { color: 'slate' },
          { color: 'black' },
          { color: 'white' },
        ]}
        onChange={(color) => {
          dispatch({ type: 'CHANGE_TEXT_COLOR', payload: color });
          formatTextColor(editor, color);
        }}
      />
    </Bubble>
  );
}

function formatTextColor(editor: LexicalEditor, color: string) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return null;
    $patchStyleText(selection, { color });
  });
}
