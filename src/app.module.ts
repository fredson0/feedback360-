import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [FeedbackModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
