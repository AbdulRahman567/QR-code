import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

/**
 * Data expected in the body of POST /qr/generate.
 * class-validator decorators enforce that the field exists,
 * is a string, and is a well-formed URL before it ever
 * reaches the service layer.
 */
export class GenerateQrDto {
  @IsNotEmpty({ message: 'URL must not be empty.' })
  @IsString({ message: 'URL must be a string.' })
  @IsUrl(
    { require_protocol: true },
    { message: 'Please provide a valid URL (including http:// or https://).' },
  )
  url: string;
}
