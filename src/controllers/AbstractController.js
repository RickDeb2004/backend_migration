const { Authentication } = require("../utils/Authentication");
const { ApiResponse } = require("../../models/ApiResponse");
const { HttpStatus } = require("../utils/HttpStatus");

class AbstractController {
  // Success response builders
  getAuthentication(req) {
    const authentication = Authentication.getAuthentication(req);
    console.log("Authentication:", authentication);

    return authentication;
  }

  static success(data) {
    const successResponse = new ApiResponse(true, HttpStatus.OK, null, data);
    return {
      status: HttpStatus.OK,
      body: successResponse,
    };
  }

  static successWithMessage(message, data) {
    const successResponse = new ApiResponse(true, HttpStatus.OK, message, data);
    return {
      status: HttpStatus.OK,
      body: successResponse,
    };
  }

  static successWithStatus(httpStatus, data) {
    const successResponse = new ApiResponse(true, httpStatus, null, data);
    return {
      status: httpStatus,
      body: successResponse,
    };
  }

  successWithStatusAndMessage(httpStatus, message, data) {
    const successResponse = new ApiResponse(true, httpStatus, message, data);
    return {
      status: httpStatus,
      body: successResponse,
    };
  }

  // Error response builders
  static failure(message) {
    const failureResponse = new ApiResponse(
      false,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      null
    );
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: failureResponse,
    };
  }

  static failureWithStatus(httpStatus, message) {
    const failureResponse = new ApiResponse(false, httpStatus, message, null);
    return {
      status: httpStatus,
      body: failureResponse,
    };
  }
}

module.exports = AbstractController;
