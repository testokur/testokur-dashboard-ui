'use strict';

/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export enum HttpStatusCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  SWITCH_PROXY = 306,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,

  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LENGTH_REQUIRED = 411,

  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PRECONDITION_FAILED = 412,

  /**
   * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
   */
  PAYLOAD_TOO_LARGE = 413,

  URI_TOO_LONG = 414,

  UNSUPPORTED_MEDIA_TYPE = 415,

  /**
   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   * For example, if the client asked for a part of the file that lies beyond the end of the file.
   * Called "Requested Range Not Satisfiable" previously.
   */
  RANGE_NOT_SATISFIABLE = 416,

  /**
   * The server cannot meet the requirements of the Expect request-header field.
   */
  EXPECTATION_FAILED = 417,

  I_AM_A_TEAPOT = 418,

  MISDIRECTED_REQUEST = 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * The resource that is being accessed is locked.
   */
  LOCKED = 423,

  /**
   * The request failed due to failure of a previous request (e.g., a PROPPATCH).
   */
  FAILED_DEPENDENCY = 424,

  /**
   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
   */
  UPGRADE_REQUIRED = 426,

  /**
   * The origin server requires the request to be conditional.
   * Intended to prevent "the 'lost update' problem, where a client
   * GETs a resource's state, modifies it, and PUTs it back to the server,
   * when meanwhile a third party has modified the state on the server, leading to a conflict."
   */
  PRECONDITION_REQUIRED = 428,

  /**
   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * The server is unwilling to process the request because either an individual header field,
   * or all the header fields collectively, are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

  /**
   * A server operator has received a legal demand to deny access to a resource or to a set of resources
   * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  INTERNAL_SERVER_ERROR = 500,

  /**
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   * Usually this implies future availability (e.g., a new feature of a web-service API).
   */
  NOT_IMPLEMENTED = 501,

  /**
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   * Generally, this is a temporary state.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * The server does not support the HTTP protocol version used in the request
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,

  /**
   * Transparent content negotiation for the request results in a circular reference.
   */
  VARIANT_ALSO_NEGOTIATES = 506,

  /**
   * The server is unable to store the representation needed to complete the request.
   */
  INSUFFICIENT_STORAGE = 507,

  /**
   * The server detected an infinite loop while processing the request.
   */
  LOOP_DETECTED = 508,

  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NOT_EXTENDED = 510,

  /**
   * The client needs to authenticate to gain network access.
   * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
   * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export default HttpStatusCode;
