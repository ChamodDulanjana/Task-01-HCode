import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {graphqlUploadExpress} from "graphql-upload-ts";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Apply the graphql-upload middleware
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
