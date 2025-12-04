export const HTTPStausCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTPStausMessages = {
  OK: "Success",
  CREATED: "Resource created successfully",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  ALREADY_EXISTS: "Resource already exists",
} as const;
