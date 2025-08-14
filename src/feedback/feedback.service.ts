import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return this.prisma.feedback.create({
      data: {
        message: createFeedbackDto.message,
        sender: createFeedbackDto.sender || 'Anônimo',
      },
    });
  }

  async findAll(): Promise<Feedback[]> {
    return this.prisma.feedback.findMany();
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.prisma.feedback.findUnique({ where: { id } });
    if (!feedback) throw new NotFoundException(`Feedback com ID ${id} não encontrado`);
    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    await this.findOne(id);
    return this.prisma.feedback.update({
      where: { id },
      data: {
        message: updateFeedbackDto.message,
        sender: updateFeedbackDto.sender || 'Anônimo',
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.feedback.delete({ where: { id } });
    return { message: `Feedback com ID ${id} foi deletado com sucesso` };
  }
}
