import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ReactElement } from 'react';

export interface Step {
  /**
   * If defined will be used as the React key for the step elements
   * Otherwise the step index will be used
   */
  id?: string;
  label: string;
  description?: string;
}

export interface StepperProps<T extends Step> {
  steps: T[];
  current: number;
  /**
   * Called when the user clicks on a previous step
   */
  onSelectStep?: (index: number, step: T) => void;

  /**
   * Display a rounded border on selected step (default to false)
   */
  showSpinnerOnSelectedStep?: boolean;
}

function getLabelSteps(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function Stepper<T extends Step>(props: StepperProps<T>) {
  const {
    steps,
    current,
    onSelectStep,
    showSpinnerOnSelectedStep = false,
  } = props;

  return (
    <nav>
      <ol className="divide-y divide-neutral-300 rounded-md border border-neutral-300 md:flex md:divide-y-0">
        {steps.map((step, index) => (
          <li
            key={step.id || index}
            className={clsx('relative md:flex md:flex-1', {
              'cursor-pointer': onSelectStep && index < current,
            })}
            onClick={() => {
              // We only allow to navigate back in the steps
              if (onSelectStep && index < current) {
                onSelectStep(index, step);
              }
            }}
          >
            {index < current && <StepDone step={step} />}
            {index === current && (
              <StepCurrent
                step={step}
                index={index}
                showSpinnerOnSelectedStep={showSpinnerOnSelectedStep}
              />
            )}
            {index > current && <StepToDoComponent step={step} index={index} />}
            {index + 1 !== steps.length && <Separator />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface StepCurrentProps {
  step: Step;
  index: number;
  showSpinnerOnSelectedStep: boolean;
}

function StepCurrent(props: StepCurrentProps): ReactElement | null {
  const { step, index, showSpinnerOnSelectedStep } = props;
  if (step === undefined) return null;

  return (
    <span
      className={clsx(
        'flex px-6 py-5 text-sm font-semibold lg:pl-9',
        !step.description ? 'items-center' : 'items-start',
      )}
      aria-current="step"
    >
      <span className="relative flex shrink-0 items-center justify-center">
        <span
          className={clsx(
            'flex size-10 items-center justify-center rounded-full border-2 border-primary-600',
            showSpinnerOnSelectedStep && 'animate-spin border-r-primary-400',
          )}
        />
        <span className="absolute text-primary-600">
          {getLabelSteps(index)}
        </span>
      </span>
      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
        <span className="text-xs font-semibold tracking-wide text-primary-600 uppercase">
          {step.label}
        </span>
        {step.description && (
          <span className="text-sm font-semibold text-neutral-500">
            {step.description}
          </span>
        )}
      </span>
    </span>
  );
}

function StepToDoComponent(props: { step: Step; index: number }): ReactElement {
  return (
    <span
      className={clsx(
        'flex px-6 py-5 text-sm font-semibold lg:pl-9',
        !props.step.description ? 'items-center' : 'items-start',
      )}
    >
      <span className="shrink-0">
        <span className="flex size-10 items-center justify-center rounded-full border-2 border-neutral-300">
          <span className="text-neutral-500">{getLabelSteps(props.index)}</span>
        </span>
      </span>
      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
        <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          {props.step.label}
        </span>
        <span className="text-sm font-semibold text-neutral-500">
          {props.step.description}
        </span>
      </span>
    </span>
  );
}

function StepDone(props: { step: Step }): ReactElement {
  return (
    <span
      className={clsx(
        'flex px-6 py-5 text-sm font-semibold lg:pl-9',
        !props.step.description ? 'items-center' : 'items-start',
      )}
    >
      <span className="shrink-0">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary-600">
          <CheckIcon className="size-6 text-white" />
        </span>
      </span>
      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
        <span className="text-xs font-semibold tracking-wide uppercase">
          {props.step.label}
        </span>
        <span className="text-sm font-semibold text-neutral-500">
          {props.step.description}
        </span>
      </span>
    </span>
  );
}

function Separator(): ReactElement {
  return (
    <div className="absolute top-0 right-0 hidden h-full w-5 md:block">
      <svg
        className="size-full text-neutral-300"
        viewBox="0 0 22 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 -2L20 40L0 82"
          vectorEffect="non-scaling-stroke"
          stroke="currentcolor"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
