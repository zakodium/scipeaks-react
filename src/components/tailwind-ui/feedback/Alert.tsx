import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { Button } from '../elements/buttons/Button';
import { Variant, Color } from '../types';

export enum IAlertType {
  SUCESS = 'sucess',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface IAlertProps {
  title: string;
  className?: string;
  type: IAlertType;
  children?: ReactNode;
  onDismiss?: () => void;
}

const theme = {
  [IAlertType.INFO]: {
    theme: {
      background: 'bg-blue-50',
      title: 'text-blue-800',
      text: 'text-blue-700',
    },
    icon: <InfoIcon />,
  },
  [IAlertType.WARNING]: {
    theme: {
      background: 'bg-yellow-50',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
    },
    icon: <WarningIcon />,
  },
  [IAlertType.ERROR]: {
    theme: {
      background: 'bg-red-50',
      title: 'text-red-800',
      text: 'text-red-700',
    },
    icon: <ErrorIcon />,
  },
  [IAlertType.SUCESS]: {
    theme: {
      background: 'bg-green-50',
      title: 'text-green-800',
      text: 'text-green-700',
    },
    icon: <SucesssIcon />,
  },
};

function getColorByType(type: IAlertType): Color {
  switch (type) {
    case IAlertType.INFO:
      return Color.primary;
    case IAlertType.ERROR:
      return Color.danger;
    case IAlertType.SUCESS:
      return Color.success;
    case IAlertType.WARNING:
      return Color.warning;
    default:
      throw new Error('type cannot be null');
  }
}

export function Alert(props: IAlertProps): JSX.Element {
  const type = theme[props.type];

  return (
    <div className={classNames('p-4 rounded-md', type.theme.background)}>
      <div className="flex">
        <div className="flex-shrink-0">{type.icon}</div>
        <div className="ml-3">
          <h3
            className={classNames(
              'text-sm font-medium leading-5',
              type.theme.title,
            )}
          >
            {props.title}
          </h3>
          {props.children && (
            <div
              className={classNames('mt-2 text-sm leading-5', type.theme.text)}
            >
              {props.children}
            </div>
          )}
        </div>

        {props.onDismiss && (
          <div className="pl-3 ml-auto">
            <div className="-mx-1.5 -my-1.5">
              <Button
                onClick={props.onDismiss}
                variant={Variant.hover}
                color={getColorByType(props.type)}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function WarningIcon(): JSX.Element {
  return (
    <svg
      className="w-5 h-5 text-yellow-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ErrorIcon(): JSX.Element {
  return (
    <svg
      className="w-5 h-5 text-red-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SucesssIcon(): JSX.Element {
  return (
    <svg
      className="w-5 h-5 text-green-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function InfoIcon(): JSX.Element {
  return (
    <svg
      className="w-5 h-5 text-blue-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
