import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  getFiltersCount
} from '@folio/stripes-acq-components';

import {
  SUBMISSIONS_API
} from '../../../common/constants';

import { useBuildQuery } from '../useBuildQuery';

export const useSubmissions = ({
  pagination,
  searchParams = {},
  options = {},
  key,
  submissionId
}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key });

  const { search } = useLocation();
  const buildQuery = useBuildQuery();
  const queryParams = queryString.parse(search);
  const query = buildQuery(queryParams);
  const filtersCount = getFiltersCount(queryParams);

  const defaultSearchParams = {
    query,
    limit: pagination.limit,
    offset: pagination.offset
  };

  const endpoint = submissionId ? `${SUBMISSIONS_API}/${submissionId}` : SUBMISSIONS_API

  // Form our query key, we may need to append the submission ID to it
  const queryKey = [namespace, pagination.timestamp, pagination.limit, pagination.offset];
  if (submissionId) {
    queryKey.push(submissionId);
  }

  const queryFn = () => {
    if (!filtersCount) {
      return { submissions: [], totalRecords: 0 };
    }

    return ky
      .get(endpoint, { searchParams: { ...defaultSearchParams, ...searchParams } })
      .json();
  }
  const defaultOptions = {
    enabled: Boolean(pagination.timestamp),
    keepPreviousData: true
  };

  const { isFetching, data } = useQuery(
    queryKey,
    queryFn,
    {
      ...defaultOptions,
      ...options
    }
  );

  // Although the API will return a single submission object when requested, we need to
  // provide a consistent shaped object, with the distinct submissions array
  let toReturn = {
    isLoading: isFetching
  };
  if (submissionId) {
    toReturn.submissions = [data];
  } else {
    toReturn = {
      ...toReturn,
      ...data
    };
  }
  return toReturn;
};

