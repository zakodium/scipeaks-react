import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import type {
  BaseSyntheticEvent,
  FormEvent,
  FormEventHandler,
  ReactNode,
} from 'react';
import { useMemo } from 'react';
import type {
  FieldValues,
  Resolver,
  ResolverResult,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import type { ObjectSchema } from 'yup';
import type { ZodSchema } from 'zod';

import type { EmptyValue } from '../../util';
import { getEmptyValueProp } from '../../util';
import { configContext } from '../context/RHFContext';

export type ValidationSchemaZod<T extends FieldValues> = ZodSchema<T>;
export type ValidationSchemaYup<T extends FieldValues> = ObjectSchema<T>;
export type ValidationSchemaArray =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Array<ValidationSchemaZod<any> | ValidationSchemaYup<any>>;

type ValidationSchema<T extends FieldValues> =
  | ValidationSchemaYup<T>
  | ValidationSchemaZod<T>
  | ValidationSchemaArray;

function buildResolvers<TValues extends FieldValues>(
  schema: ValidationSchema<TValues>,
) {
  let schemas: ValidationSchemaArray;
  if (Array.isArray(schema)) {
    schemas = schema;
  } else {
    schemas = [schema];
  }

  if (schemas.some((schema) => !isZodType(schema))) {
    // eslint-disable-next-line no-console
    console.warn(
      'Yup validation schemas are deprecated. Use Zod schemas instead.',
    );
  }
  const superResolver: Resolver<TValues> = async (
    formValues,
    context,
    options,
  ) => {
    const allErrors = {};
    const allValues = {};

    await Promise.all(
      schemas
        .slice()
        .reverse()
        .map(async (schema) => {
          const resolver: Resolver<TValues> = isZodType(schema)
            ? zodResolver(schema)
            : yupResolver(schema);
          const { values, errors } = await resolver(
            formValues,
            context,
            options,
          );
          Object.assign(allErrors, errors);
          Object.assign(allValues, values);
        }),
    );

    return {
      errors: allErrors,
      values: allValues,
    } as ResolverResult<TValues>;
  };
  return superResolver;
}

export interface BaseRootFormError {
  type?: string;
  message: string;
}

export type FormatSubmitErrorCallback = (error: unknown) => BaseRootFormError;

export type FormRHFProps<TValues extends FieldValues> = Omit<
  UseFormProps<TValues>,
  'resolver' | 'reValidateMode' | 'shouldUnregister'
> & {
  onSubmit: (
    data: TValues,
    event: BaseSyntheticEvent | undefined,
    methods: UseFormReturn<TValues>,
  ) => ReturnType<SubmitHandler<TValues>>;
  onInvalidSubmit?: SubmitErrorHandler<TValues>;
  /**
   * If not provided, `onReset` form will stop propagation and call `rhf.reset()`.
   * You got the event, you are in charge to stop propagation if needed.
   *
   * @param form
   * @param event
   */
  reset?: (
    form: UseFormReturn<TValues>,
    event: FormEvent<HTMLFormElement>,
  ) => void;
  /**
   * if not provided, will try to call `props.reset(form, event)`.
   * if no `props.reset`, stop propagation and call `rhf.reset()`
   */
  onReset?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  validationSchema?: ValidationSchema<TValues>;
  noDefaultStyle?: boolean;
  id?: string;
  className?: string;
  emptyValue?: EmptyValue;
  formatSubmitError?: FormatSubmitErrorCallback;
};

const graphqlPrefix = 'GraphQL error: ';

const defaultFormatSubmitError: FormatSubmitErrorCallback = (error) => {
  let message = 'Unknown error';
  if (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message !== ''
  ) {
    message = error.message.replace(graphqlPrefix, '');
  }

  return { type: 'server', message };
};

export interface RootFormError extends BaseRootFormError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function FormRHF<TValues extends FieldValues>(
  props: FormRHFProps<TValues>,
) {
  const {
    onSubmit,
    onInvalidSubmit,
    onReset: onResetProps,
    reset,
    noDefaultStyle = false,
    id,
    className,
    validationSchema,
    children,
    emptyValue,
    formatSubmitError = defaultFormatSubmitError,
    ...formHookProps
  } = props;

  const resolver = useMemo(() => {
    return validationSchema ? buildResolvers(validationSchema) : undefined;
  }, [validationSchema]);

  const methods = useForm<TValues>({
    ...formHookProps,
    shouldUseNativeValidation: false,
    resolver,
  });

  const finalEmptyValue = getEmptyValueProp(props);
  const configValue = useMemo(() => {
    return {
      emptyValue: finalEmptyValue,
    };
  }, [finalEmptyValue]);

  const onReset = useMemo<typeof onResetProps>(() => {
    if (onResetProps) return onResetProps;

    return (event) => {
      if (reset) {
        return reset(methods, event);
      }

      event.preventDefault();
      event.stopPropagation();

      methods.reset();
    };
  }, [onResetProps, reset, methods]);

  return (
    <configContext.Provider value={configValue}>
      <FormProvider {...methods}>
        <form
          id={id}
          className={clsx(
            { 'flex flex-1 flex-col gap-y-4': !noDefaultStyle },
            className,
          )}
          onReset={onReset}
          onSubmit={(event) => {
            // We have to call this before the handleSubmit from react-hook-form
            // because the library calls us after doing async activity, and it is too late to stop the propagation.
            event.stopPropagation();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            methods.handleSubmit(async (data, event) => {
              try {
                await onSubmit(data, event, methods);
              } catch (error) {
                if (!(error instanceof Error)) {
                  // eslint-disable-next-line no-console
                  console.error(
                    error,
                    'FormRHF submit resulted in a non-error exception',
                  );
                }

                const rootError: RootFormError = {
                  ...formatSubmitError(error as Error),
                  error,
                  data,
                };

                methods.setError('root', rootError);
              }
            }, onInvalidSubmit)(event);
          }}
          noValidate
        >
          {children}
        </form>
      </FormProvider>
    </configContext.Provider>
  );
}

function isZodType<T extends FieldValues>(
  schema: ValidationSchemaZod<T> | ValidationSchemaYup<T>,
): schema is ValidationSchemaZod<T> {
  // @ts-expect-error duck-typing to avoid instanceof which is dangerous when using bundlers
  return !!schema.parse;
}
