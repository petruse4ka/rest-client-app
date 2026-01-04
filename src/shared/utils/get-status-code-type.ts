type StatusCodeType = 'danger' | 'success' | 'secondary';

export function getStatusCodeType(statusCode: number | undefined): StatusCodeType {
  if (statusCode === undefined) {
    return 'secondary';
  }

  if (statusCode === 0 || statusCode >= 400) {
    return 'danger';
  }

  if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  }

  return 'secondary';
}
