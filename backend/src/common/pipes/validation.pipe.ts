import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Global validation pipe.
 *
 * Transforms incoming plain request bodies into their DTO class
 * instances and runs class-validator against them. Any violation
 * short-circuits the request with a single, readable message so
 * the frontend can display it directly to the user.
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: false,
    });

    if (errors.length > 0) {
      const firstError = errors[0];
      const message = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : 'Validation failed.';
      throw new BadRequestException(message);
    }

    return object;
  }

  private shouldValidate(metatype: any): boolean {
    const primitiveTypes = [String, Boolean, Number, Array, Object];
    return !primitiveTypes.includes(metatype);
  }
}
