import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto, user: any): Promise<Feedback> {
    console.log('📝 Criando feedback:', createFeedbackDto);
    
    const result = await this.prisma.feedback.create({
      data: {
        message: createFeedbackDto.message,
        userId: user.id,
        sender: user.nome,
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

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto, user: any): Promise<Feedback> {
    console.log('🔄 Atualizando feedback:', { id, userId: user.id });
    
    // Busca o feedback e verifica se existe
    const feedback = await this.findOne(id);
    
    // Verifica se o usuário é o dono do feedback
    if (feedback.userId !== user.id) {
      throw new BadRequestException('Você só pode editar seus próprios feedbacks');
    }
    
    // Só permite alterar a mensagem - o sender continua o mesmo
    return this.prisma.feedback.update({
      where: { id },
      data: {
        message: updateFeedbackDto.message,
        // sender não muda - continua sendo o mesmo usuário
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

