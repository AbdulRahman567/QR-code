import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

function getAllowedOrigins() {
  const configured = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : [];

  return configured.length > 0
    ? configured
    : ['http://localhost:5173', 'http://localhost:3000'];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = getAllowedOrigins();

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const isExactMatch = allowedOrigins.includes(origin);
      const isVercelPreview =
        process.env.ALLOW_VERCEL_PREVIEWS === 'true' &&
        /^https:\/\/.+\.vercel\.app$/.test(origin);

      if (isExactMatch || isVercelPreview) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 5000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀 QR Code Generator API running on http://localhost:${port}`);
}

bootstrap();
