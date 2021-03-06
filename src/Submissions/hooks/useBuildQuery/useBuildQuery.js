import { useCallback } from 'react';

import {
  makeQueryBuilder
} from '@folio/stripes-acq-components';

import {
  getKeywordQuery
} from '../../SubmissionsList/SubmissionsListSearchConfig';
import {
  customFilterMap,
  CUSTOM_SORT_MAP
} from '../../SubmissionsList/SubmissionsListFilter/SubmissionsListFilterConfig';

export const useBuildQuery = () => {
  return useCallback(makeQueryBuilder(
    'cql.allRecords=1',
    (query, qIndex) => {
      if (qIndex) {
        return `(${qIndex}=${query}*)`;
      }

      return getKeywordQuery(query);
    },
    'sortby name/sort.ascending',
    customFilterMap,
    CUSTOM_SORT_MAP
  ), []);
};
