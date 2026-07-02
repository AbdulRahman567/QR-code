import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { buildErrorResponse } from '../utils/response.helper';

/**
 * Catches every exception thrown anywhere in the application
 * (HttpExceptions and unexpected errors alike) and converts it
 * into the API's standard { success, message } shape, so the
 * frontend never has to deal with more than one error format.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong. Please try again.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        exceptionResponse &&
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        const responseMessage = (exceptionResponse as { message: unknown })
          .message;
        message = Array.isArray(responseMessage)
          ? responseMessage[0]
          : String(responseMessage);
      }
    }

    response.status(status).json(buildErrorResponse(message));
  }
}
