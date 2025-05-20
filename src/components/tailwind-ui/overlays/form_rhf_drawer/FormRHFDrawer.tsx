import type { ComponentType } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { FormRHFProps } from '../../forms/react-hook-form/form_rhf/FormRHF';
import { FormRHF } from '../../forms/react-hook-form/form_rhf/FormRHF';
import type { DrawerRootProps } from '../drawer/Drawer';
import { DrawerRoot } from '../drawer/Drawer';
import { useFormRHFDialog } from '../hooks/useFormRHFDialog';

export type FormRHFDrawerProps<TValues extends FieldValues> = Omit<
  DrawerRootProps<ComponentType<FormRHFProps<TValues>>>,
  'as' | 'asProps'
> &
  Omit<FormRHFProps<TValues>, 'className' | 'children'> & {
    noAutoCloseOnSubmit?: boolean;
  };

export function FormRHFDrawerRoot<TValues extends FieldValues>(
  props: FormRHFDrawerProps<TValues>,
) {
  const {
    children,
    preventCloseOnInteractOutside = true,
    onSubmit: onSubmitProps,
    noAutoCloseOnSubmit = false,
    ...otherProps
  } = props;

  const { onSubmit, hiddenCloseButton } = useFormRHFDialog(
    noAutoCloseOnSubmit,
    onSubmitProps,
  );

  return (
    <DrawerRoot
      {...otherProps}
      preventCloseOnInteractOutside={preventCloseOnInteractOutside}
      allowPageInteraction={false}
      as={FormRHF<TValues>}
      asProps={{ ...otherProps, onSubmit }}
    >
      {hiddenCloseButton}

      {children}
    </DrawerRoot>
  );
}

export {
  DrawerBody as FormRHFDrawerBody,
  DrawerClose as FormRHFDrawerClose,
  DrawerFooter as FormRHFDrawerFooter,
  DrawerTitle as FormRHFDrawerTitle,
} from '../drawer/Drawer';
