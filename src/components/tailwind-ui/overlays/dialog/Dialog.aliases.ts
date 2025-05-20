import {
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogLayout,
  DialogRoot,
  DialogTitle,
  DialogClose,
  DialogClosableSubmitButtonRHF,
  DialogOpenerButtonRHF,
} from './Dialog';

/*
 * HMR optimizations
 * need to move alias object outside is module or will produce HMR errors and rebuilds
 */

// aliases export
export const Dialog = {
  Root: DialogRoot,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Layout: DialogLayout,
  Close: DialogClose,
  ClosableSubmitButtonRHF: DialogClosableSubmitButtonRHF,
  OpenerButtonRHF: DialogOpenerButtonRHF,
} as const;
