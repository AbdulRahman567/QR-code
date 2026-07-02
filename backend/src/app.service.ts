import { Injectable } from '@nestjs/common';
import { buildSuccessResponse } from './common/utils/response.helper';

@Injectable()
export class AppService {
  getHealth() {
    return buildSuccessResponse('QR Code Generator API is running.');
  }
}
