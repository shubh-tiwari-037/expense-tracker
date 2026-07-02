export class ApiResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export const sendResponse = (res, statusCode, message, data = null) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode < 400, message, data));
};
