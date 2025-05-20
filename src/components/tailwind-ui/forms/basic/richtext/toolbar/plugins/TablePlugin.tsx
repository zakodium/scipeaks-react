import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';

import { useOnOff } from '../../../../../hooks/useOnOff';
import { TranslationsText } from '../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../internationalization/useTranslation';
import {
  FormRHFDialogBody,
  FormRHFDialogFooter,
  FormRHFDialogRoot,
  FormRHFDialogSubmit,
  FormRHFDialogTitle,
} from '../../../../../overlays/form_rhf_dialog/FormRHFDialog';
import { CheckboxFieldRHF } from '../../../../react-hook-form/checkbox_field_rhf/CheckboxFieldRHF';
import { InputFieldRHF } from '../../../../react-hook-form/input_field_rhf/InputFieldRHF';
import { INSERT_NEW_TABLE_COMMAND } from '../../@lexical/table/TablePlugin';
import { useRichTextContext } from '../../context/RichTextContext';
import type { RichTextFormatType } from '../../context/RichTextProvider';
import { ToolbarPluginButton } from '../ToolbarPlugin';
import type { TooltipPluginElement } from '../types';

export default function TablePlugin(): TooltipPluginElement {
  const [state] = useRichTextContext();
  const [isOpenModal, openModal, closeModal] = useOnOff(false);

  const label = useTranslation('richtext.toolbar.table.label');

  return (
    <>
      <ToolbarPluginButton
        label={label}
        onClick={openModal}
        tooltip={<TranslationsText textKey="richtext.toolbar.table.tooltip" />}
        variant={!state['table' as RichTextFormatType] ? 'white' : 'secondary'}
      >
        <TableCellsIcon className="size-5" />
      </ToolbarPluginButton>
      <TableForm isOpen={isOpenModal} closeModal={closeModal} />
    </>
  );
}

interface TableFormProps {
  isOpen: boolean;
  closeModal: () => void;
}

const defaultTableFormValues = {
  columns: 5,
  rows: 5,
  includeColumnAsHeaders: false,
  includeRowAsHeaders: true,
};

function TableForm(props: TableFormProps) {
  const { closeModal, isOpen } = props;

  const [editor] = useLexicalComposerContext();

  function onSubmit(values: typeof defaultTableFormValues) {
    editor.dispatchCommand(INSERT_NEW_TABLE_COMMAND, {
      columns: String(values.columns),
      rows: String(values.rows),
      includeHeaders: {
        columns: values.includeColumnAsHeaders,
        rows: values.includeRowAsHeaders,
      },
    });

    closeModal();
  }

  return (
    <FormRHFDialogRoot
      onSubmit={onSubmit}
      open={isOpen}
      defaultValues={defaultTableFormValues}
      onOpenChange={(open) => {
        if (open) return;
        closeModal();
      }}
    >
      <FormRHFDialogTitle>
        <TranslationsText textKey="richtext.toolbar.table.form.header" />
      </FormRHFDialogTitle>

      <FormRHFDialogBody>
        <InputFieldRHF
          name="columns"
          type="number"
          label={
            <TranslationsText textKey="richtext.toolbar.table.form.columns" />
          }
        />
        <InputFieldRHF
          name="rows"
          type="number"
          label={
            <TranslationsText textKey="richtext.toolbar.table.form.rows" />
          }
        />
        <CheckboxFieldRHF
          name="includeRowAsHeaders"
          label={
            <TranslationsText textKey="richtext.toolbar.table.form.includeRowAsHeaders" />
          }
        />
        <CheckboxFieldRHF
          name="includeColumnAsHeaders"
          label={
            <TranslationsText textKey="richtext.toolbar.table.form.includeColumnAsHeaders" />
          }
        />
      </FormRHFDialogBody>

      <FormRHFDialogFooter>
        <FormRHFDialogSubmit>
          <TranslationsText textKey="richtext.toolbar.table.form.submit" />
        </FormRHFDialogSubmit>
      </FormRHFDialogFooter>
    </FormRHFDialogRoot>
  );
}
