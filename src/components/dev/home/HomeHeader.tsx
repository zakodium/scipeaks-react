import React from 'react';

import { Input } from '../../tailwind-ui';

import { useHomeContext } from './HomeContext';

export default function HomeHeader() {
  const { rocUrl, database, iframePage } = useHomeContext();
  return (
    <header className="flex flex-row p-2 space-x-4">
      <Input
        name="rocUrl"
        type="text"
        label="ROC URL"
        className="flex-1"
        value={rocUrl}
        readOnly
      />
      <Input
        name="database"
        type="text"
        label="Database"
        className="flex-1"
        value={database}
        readOnly
      />
      <Input
        name="iframePage"
        type="text"
        label="Page to open"
        className="flex-1"
        value={iframePage}
        readOnly
      />
    </header>
  );
}
