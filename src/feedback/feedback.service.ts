import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    console.log('📝 Criando feedback:', createFeedbackDto);
    
    const result = await this.prisma.feedback.create({
      data: {
        message: createFeedbackDto.message,
        sender: createFeedbackDto.sender || 'Anônimo',
      },
    });
    
    console.log('✅ Feedback criado com ID:', result.id);
    return result;
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

  async findBySender(sender: string): Promise<Feedback[]> {
    console.log('🔍 Buscando feedbacks do sender:', sender);

    if (!sender || sender.trim() === '') {
      throw new BadRequestException('sender não pode ser vazio');
    }

  const feedbacks = await this.prisma.feedback.findMany({ 
    where: { sender } 
  });
    console.log(`📊 Encontrados ${feedbacks.length} feedbacks`);

    if (feedbacks.length === 0) {
      throw new NotFoundException(`nenhum feedback foi encontrado para o sender: ${sender}`);
    }
    return feedbacks;
  }

}

