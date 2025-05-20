import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface QuestionType {
  id: string;
  question: ReactNode;
  answer: ReactNode;
}

export interface FaqProps {
  title: ReactNode;
  questions: QuestionType[];
  selectedQuestionId: string;
  onSelect: (id: string) => void;
}

export interface QuestionProps {
  selectedQuestionId: string;
  onSelect: (id: string) => void;
  question: QuestionType;
}

const Question = (props: QuestionProps) => {
  const {
    question: { id, question, answer },
    selectedQuestionId,
    onSelect,
  } = props;

  const onToggle = () => {
    if (id === selectedQuestionId) onSelect('');
    else onSelect(id);
  };

  return (
    <div id={id} className="py-6 first:pt-0 last:pb-0">
      <dt className="text-lg">
        <button
          onClick={onToggle}
          type="button"
          className="flex w-full items-start justify-between text-left text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
        >
          <span className="font-semibold text-neutral-900">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            <ChevronDownIcon
              className={clsx('size-6', {
                '-rotate-180': selectedQuestionId === id,
              })}
            />
          </span>
        </button>
      </dt>
      <dd
        className={clsx('mt-2 pr-12', {
          hidden: selectedQuestionId !== id,
        })}
      >
        <div className="text-justify text-base text-neutral-500">{answer}</div>
      </dd>
    </div>
  );
};

export function Faq(props: FaqProps) {
  const { title, questions, selectedQuestionId, onSelect } = props;

  return (
    <div className="max-w-3xl">
      <h2 className="text-center text-3xl font-extrabold text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      <dl className="mt-16 divide-y divide-neutral-900/10">
        {questions.map((question) => (
          <Question
            key={question.id}
            selectedQuestionId={selectedQuestionId}
            question={question}
            onSelect={onSelect}
          />
        ))}
      </dl>
    </div>
  );
}
