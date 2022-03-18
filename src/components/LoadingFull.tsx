import { Spinner } from './tailwind-ui';

export default function LoadingFull() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="h-10 w-10 text-alternative-500" />
    </div>
  );
}
