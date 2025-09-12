export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'Unknown error occurred',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. The server took too long to respond.',
  CORS_ERROR: 'CORS error. The server does not allow requests from this domain.',
  DNS_ERROR: 'Unable to connect to the server. Please check the URL and try again.',
  CONNECTION_REFUSED_ERROR: 'Connection refused. The server may be down or the URL is incorrect.',
  SSL_ERROR: "SSL/TLS error. There may be a problem with the server's security certificate.",
};

export const JSON_PLACEHOLDER = '{\n  "key": "value"\n}';
export const XML_PLACEHOLDER =
  '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item>value</item>\n</root>';
