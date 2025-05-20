import { PhotoIcon } from '@heroicons/react/24/outline';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';

import { useOnOff } from '../../../../../hooks/useOnOff';
import { TranslationsText } from '../../../../../internationalization/TranslationsText';
import { useTranslation } from '../../../../../internationalization/useTranslation';
import {
  DialogBody,
  DialogFooter,
  DialogTitle,
} from '../../../../../overlays/dialog/Dialog';
import { FormRHFDialogRoot } from '../../../../../overlays/form_rhf_dialog/FormRHFDialog';
import { InputFieldRHF } from '../../../../react-hook-form/input_field_rhf/InputFieldRHF';
import { SubmitButtonRHF } from '../../../../react-hook-form/submit_button/SubmitButtonRHF';
import { INSERT_IMAGE_COMMAND } from '../../plugins/ImagesPlugin.commands';
import { ToolbarPluginButton } from '../ToolbarPlugin';
import type { TooltipPluginElement } from '../types';

export default function ImagePlugin(): TooltipPluginElement {
  const [isOpenModal, openModal, closeModal] = useOnOff(false);
  const label = useTranslation('richtext.toolbar.image.tooltip.label');

  return (
    <>
      <ToolbarPluginButton
        label={label}
        variant="white"
        onClick={openModal}
        tooltip={<TranslationsText textKey="richtext.toolbar.image.tooltip" />}
      >
        <PhotoIcon className="size-5" />
      </ToolbarPluginButton>
      <ImageForm isOpen={isOpenModal} closeModal={closeModal} />
    </>
  );
}

interface ImageFormProps {
  isOpen: boolean;
  closeModal: () => void;
}

const defaultImageFormValues = {
  src: '',
  alt: '',
};

function ImageForm(props: ImageFormProps) {
  const { closeModal, isOpen } = props;

  const [editor] = useLexicalComposerContext();

  function onSubmit(values: typeof defaultImageFormValues) {
    if (!values.src) {
      return;
    }

    editor.dispatchCommand(INSERT_IMAGE_COMMAND, values);
    closeModal();
  }

  return (
    <FormRHFDialogRoot
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      defaultValues={defaultImageFormValues}
      onSubmit={onSubmit}
    >
      <DialogTitle>
        <TranslationsText textKey="richtext.toolbar.image.form.header" />
      </DialogTitle>

      <DialogBody className="space-y-5">
        <InputFieldRHF
          name="src"
          label={<TranslationsText textKey="richtext.toolbar.image.form.src" />}
        />
        <InputFieldRHF
          name="alt"
          label={<TranslationsText textKey="richtext.toolbar.image.form.alt" />}
        />
      </DialogBody>

      <DialogFooter>
        <SubmitButtonRHF>
          <TranslationsText textKey="richtext.toolbar.image.form.submit" />
        </SubmitButtonRHF>
      </DialogFooter>
    </FormRHFDialogRoot>
  );
}
