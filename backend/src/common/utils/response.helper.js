"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuccessResponse = buildSuccessResponse;
exports.buildErrorResponse = buildErrorResponse;
/**
 * Builds a standardized success response.
 */
function buildSuccessResponse(message, data) {
    return {
        success: true,
        message: message,
        data: data,
    };
}
/**
 * Builds a standardized error response.
 */
function buildErrorResponse(message) {
    return {
        success: false,
        message: message,
    };
}
