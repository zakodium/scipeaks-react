# Hooks to develop

## <RocProvider> and `useRoc()`

Returns an instance of `Roc`, initialized with the, API URL and database configured
at build time.

## `<RocUserProvider>` and `useRocUser()`

- Fetches information about the authenticated user using:
  - https://mydb.cheminfo.org/auth/session
  - https://mydb.cheminfo.org/db/eln/user/_me/groups

## `useSample(uuid)`

- Fetches the given sample using:
  - https://mydb.cheminfo.org/db/eln/entry/:uuid
  - https://mydb.cheminfo.org/db/eln/entry/aaa5f97c7cde94741de2938b105a97c4/_rights/read
  - https://mydb.cheminfo.org/db/eln/entry/aaa5f97c7cde94741de2938b105a97c4/_rights/write

## `<MainSampleProvider uuid={}>` and `useMainSample()`

Internally calls `useSample` and permits to access the main sample from anywhere in the children

## `useMainSampleId()`

Tries to get the main sample id from the iframe bridge, or from the query string.

## `useRocQuery('viewName', options)`

Query a CouchDB view. For example `useRocQuery('sample_toc')` would query https://mydb.cheminfo.org/db/eln/_query/sample_toc

Options examples:

- https://mydb.cheminfo.org/db/eln/_query/sample_toc?mine=1
- https://mydb.cheminfo.org/db/eln/_query/sample_toc?groups=groupCreator

## Actions to implement

- Get an attachment URL by name
- Save a sample
- `useSampleToc` ?
- handle changes, to know if sample is still unsaved
- detect server-side change of sample (polling revision id with HEAD ?)

Reference: https://github.com/cheminfo-js/visualizer-helper/blob/master/eln/Sample.js
