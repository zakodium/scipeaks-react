import { Spinner } from '@blueprintjs/core';

export default function LoadingFull() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size={40} />
    </div>
  );
}
