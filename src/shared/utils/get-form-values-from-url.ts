import { ReadonlyURLSearchParams } from 'next/navigation';
import { getInitialFormValues } from './get-initial-form-values';

export function getFormValuesFromUrl(
  params: { params?: string | string[] },
  searchParams: ReadonlyURLSearchParams
) {
  const urlParts = Array.isArray(params.params) ? params.params : [];
  return getInitialFormValues(urlParts, searchParams);
}
