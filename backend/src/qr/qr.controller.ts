import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { buildSuccessResponse } from '../common/utils/response.helper';
import { GenerateQrDto } from './dto/generate-qr.dto';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generate(@Body(ValidationPipe) generateQrDto: GenerateQrDto) {
    const qrCode = await this.qrService.generateQrCode(generateQrDto.url);

    return buildSuccessResponse('QR Code generated successfully.', {
      qrCode,
    });
  }
}
