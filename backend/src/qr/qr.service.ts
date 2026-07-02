import { BadRequestException, Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

/**
 * Encapsulates all QR-generation logic. Kept separate from the
 * controller so the generation strategy (library, options, output
 * format) can change without touching the HTTP layer.
 */
@Injectable()
export class QrService {
  /**
   * Generates a QR code for the given URL and returns it as a
   * Base64-encoded PNG data URL.
   */
  async generateQrCode(url: string): Promise<string> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 2,
        width: 512,
        color: {
          dark: '#1E1B4B',
          light: '#FFFFFF',
        },
      });

      return qrCodeDataUrl;
    } catch (error) {
      throw new BadRequestException(
        'Failed to generate QR Code. Please try again.',
      );
    }
  }
}
