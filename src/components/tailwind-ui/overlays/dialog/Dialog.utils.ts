export const bgColors = {
  primary: 'bg-primary-100',
  alternative: 'bg-alternative-100',
  danger: 'bg-danger-100',
  neutral: 'bg-neutral-100',
  success: 'bg-success-100',
  warning: 'bg-warning-100',
};

export const textColors = {
  primary: 'text-primary-800',
  alternative: 'text-alternative-800',
  danger: 'text-danger-800',
  neutral: 'text-neutral-800',
  success: 'text-success-800',
  warning: 'text-warning-800',
};

export const preventDefault = (event: Event) => event.preventDefault();

export const DialogSize = {
  // 40ch to display ~50 chars in a line
  // 2.5rem is the size of icon in container
  // 2rem is the padding of container
  // - strong opinion about `small` size
  //   see https://spectrum.adobe.com/page/writing-for-readability/#Layout
  //   and match with `fluid={false}` props from our deprecated `Modal`
  // - strong about `full` size to allow large extensible Dialog.
  //   match with `fluid={true}` props from our deprecated `Modal`.
  // - no strong opinion about `medium` and `large`
  small: 'lg:max-w-[min(40ch+2.5rem+2rem,100vw-4rem)] lg:min-w-[min(40ch,33%)]',
  // 56ch to display ~70 chars in a line
  medium:
    'lg:max-w-[min(56ch+2.5rem+2rem,100vw-4rem)] lg:min-w-[min(56ch,33%)]',
  // 75ch to display ~100 chars in a line
  large: 'lg:max-w-[min(75ch+2.5rem+2rem,100vw-4rem)] lg:min-w-[min(75ch,33%)]',
  // allow dialog to extend to fullscreen
  full: 'lg:max-w-[calc(100vw-4rem)]',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DialogSize = keyof typeof DialogSize;
