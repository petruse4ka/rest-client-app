export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'Unknown error occurred',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. The server took too long to respond.',
  CORS_ERROR: 'CORS error. The server does not allow requests from this domain.',
  DNS_ERROR: 'Unable to connect to the server. Please check the URL and try again.',
  CONNECTION_REFUSED_ERROR: 'Connection refused. The server may be down or the URL is incorrect.',
  SSL_ERROR: "SSL/TLS error. There may be a problem with the server's security certificate.",
  KEY_AND_VALUE: 'Headers must have both key and value, or be completely empty',
  INVALID_JSON: 'Invalid JSON in request body',
};

export const JSON_PLACEHOLDER = '{\n  "key": "value"\n}';
export const XML_PLACEHOLDER =
  '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item>value</item>\n</root>';

export const DEFAULT_HEADERS = [
  { id: 1, key: 'User-Agent', value: 'REST-Client-App/1.0', isDefault: true },
  { id: 2, key: 'Accept', value: 'application/json', isDefault: true },
];
