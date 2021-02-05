import React from 'react';

import { homeViews } from '../../../home-views';
import { Input, SearchSelect, useSearchSelect } from '../../tailwind-ui';

import { useHomeContext, useHomeDispatchContext } from './HomeContext';

const options = homeViews.map((view) => ({ value: view, label: view }));

export default function HomeHeader() {
  const { rocUrl, database, iframePage } = useHomeContext();
  const dispatch = useHomeDispatchContext();
  const searchSelect = useSearchSelect({ options });
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
      <div className="flex-1">
        <SearchSelect
          label="Page to open"
          {...searchSelect}
          selected={{ label: iframePage, value: iframePage }}
          onSelect={(option) => {
            if (!option) return;
            dispatch({ type: 'SET_IFRAME_PAGE', payload: option.value });
            searchSelect.onSelect(option);
          }}
        />
      </div>
    </header>
  );
}
