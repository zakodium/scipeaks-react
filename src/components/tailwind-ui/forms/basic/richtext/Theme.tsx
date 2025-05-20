import type { EditorThemeClasses } from 'lexical';

// Add CSS class to the selected key (in toolbar plugin)
export default {
  paragraph: 'mb-2',
  image: 'cursor-default inline-block relative',
  heading: {
    h1: 'text-2xl mt-4 mb-2',
    h2: 'text-xl mt-4 mb-2',
    h3: 'text-lg mt-4 mb-2',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline',
  },
  list: {
    ul: 'list-disc ml-5',
    ol: 'list-decimal ml-5',
  },
  table: 'w-[calc(100%-25px)] table-fixed',
  tableCell:
    'whitespace-nowrap relative text-sm border-neutral-200 bg-clip-padding break-words whitespace-pre-wrap',
  tableCellSelected: 'ring-2 ring-primary-500',
  tableCellHeader:
    'border-neutral-200 text-left text-xs font-semibold uppercase bg-neutral-50 bg-clip-padding min-w-[75px] break-words whitespace-pre-wrap',
  tableRow: 'divide-x divide-neutral-200',
  tableBody:
    'border-neutral-200 align-middle shadow-sm divide-y divide-neutral-200',
  root: 'pl-5 text-sm',
} as EditorThemeClasses;
