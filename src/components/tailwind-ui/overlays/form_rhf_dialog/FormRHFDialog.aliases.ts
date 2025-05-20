import {
  FormRHFDialogBody,
  FormRHFDialogCancel,
  FormRHFDialogClose,
  FormRHFDialogDescription,
  FormRHFDialogFooter,
  FormRHFDialogLayout,
  FormRHFDialogReset,
  FormRHFDialogRoot,
  FormRHFDialogSubmit,
  FormRHFDialogTitle,
} from './FormRHFDialog';

export const FormRHFDialog = {
  Root: FormRHFDialogRoot,
  Title: FormRHFDialogTitle,
  Description: FormRHFDialogDescription,
  Body: FormRHFDialogBody,
  Footer: FormRHFDialogFooter,
  Layout: FormRHFDialogLayout,
  Close: FormRHFDialogClose,
  Submit: FormRHFDialogSubmit,
  Reset: FormRHFDialogReset,
  Cancel: FormRHFDialogCancel,
} as const;
