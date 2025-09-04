import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/common/cache/cache.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService, CacheService],
})
export class FeedbackModule {}
