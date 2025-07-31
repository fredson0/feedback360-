import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar um novo feedback usando o DTO
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return this.prisma.feedback.create({
      data: createFeedbackDto,
    });
  }

  // Listar todos os feedbacks
  async findAll(): Promise<Feedback[]> {
    return this.prisma.feedback.findMany();
  }

  // Buscar um feedback pelo ID
  async findOne(id: string): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({
      where: { id },
    });
  }

  // Deletar um feedback pelo ID
  async remove(id: string): Promise<Feedback> {
    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}
