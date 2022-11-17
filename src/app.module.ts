import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthcheckService } from './healthcheck/healthcheck.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [HealthcheckService],
})
export class AppModule {}
