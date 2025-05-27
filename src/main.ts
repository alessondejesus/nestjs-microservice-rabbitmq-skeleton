import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    AppModule,
    {
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBITMQ_URL') as string],
          queue: configService.get<string>('RABBITMQ_QUEUE'),
          queueOptions: {
            durable: false,
          },
        },
      }),
      inject: [ConfigService],
    },
  );
  await app.listen();
}
bootstrap();
