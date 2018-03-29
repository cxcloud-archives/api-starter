import { QueryOptions } from '@cxcloud/ct-types/common';

export function getQueryOptions(
  page?: number,
  perPage?: number,
  sortPath?: string,
  ascending?: boolean
): QueryOptions {
  return {
    page: typeof page !== 'number' || page < 1 ? 1 : page,
    perPage: typeof perPage !== 'number' || perPage < 1 ? 20 : perPage,
    sortPath,
    ascending
  };
}
