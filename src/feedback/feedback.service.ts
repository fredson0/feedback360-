import { Injectable, NotFoundException,BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { LikeResponseDto } from './dto/like-feedback.dto';

interface WhereFilter {
  sender?: string;
}

interface OrderByQuery {
  [key: string]: 'asc' | 'desc';
}
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
        rating: createFeedbackDto.rating || 5,
      },
    });
    
    console.log('✅ Feedback criado com ID:', result.id);
    return result;
  }

  async findAll(
    limit: number,
    page: number,
    sender?: string,
    orderBy?: string,
    order?: string
  ): Promise<Feedback[]> {

    const where: WhereFilter = {};
    if (sender) {
      where.sender = sender;
    }

    const orderQuery: OrderByQuery = {};
    if (orderBy && order && (order === 'asc'|| order === 'desc')) {
      orderQuery[orderBy] = order;
    }

    const skip = (page - 1) * limit;
    const feedback = await this.prisma.feedback.findMany({
      skip,
      take: limit,
      where,
      orderBy: orderQuery,
    });
    return feedback;
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

  async findByRanking(): Promise<any[]>{

    const feedbacks = await this.prisma.feedback.findMany();
    const calcularScore = (feedback: Feedback) =>{
      return (feedback.rating * 60) + (feedback.likes * 3);
    }
      const feedbacksComScore = feedbacks.map(feedback => {
        return {
          ...feedback,
          score: calcularScore(feedback)
        };
      });
      const feedbacksOrdenados = feedbacksComScore.sort((a,b) => b.score - a.score);
      return feedbacksOrdenados;
  }

  // 👍 ALGORITMO DE LIKE - Hash Table + Counter
  /**
   * Este algoritmo usa duas estruturas de dados fundamentais:
   * 1. Hash Table única - para evitar likes duplicados em O(1)
   * 2. Counter Algorithm - para incrementar likes atomicamente
   * 
   * Complexidade: O(1) para verificação + O(1) para inserção
   */
  async likeFeedback(feedbackId: string, userId: string): Promise<LikeResponseDto> {
    console.log('👍 Executando algoritmo de like:', { feedbackId, userId });
    
    // Verificar se feedback existe
    const feedback = await this.findOne(feedbackId);
    
    // HASH TABLE LOOKUP - O(1) - Verificar se já curtiu
    const existingLike = await this.prisma.feedbackLike.findUnique({
      where: {
        unique_user_feedback_like: {
          userId,
          feedbackId
        }
      }
    });
    
    if (existingLike) {
      throw new ConflictException('Você já curtiu este feedback');
    }
    
    // TRANSAÇÃO ATÔMICA - Para garantir consistência dos dados
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Inserir na Hash Table de likes (chave única)
      await tx.feedbackLike.create({
        data: {
          userId,
          feedbackId
        }
      });
      
      // 2. COUNTER ALGORITHM - Incrementar likes atomicamente
      const updatedFeedback = await tx.feedback.update({
        where: { id: feedbackId },
        data: {
          likes: {
            increment: 1  // Operação atômica de incremento
          }
        }
      });
      
      return updatedFeedback;
    });
    
    console.log('✅ Like adicionado! Novo total:', result.likes);
    
    return {
      liked: true,
      likesCount: result.likes,
      message: 'Feedback curtido com sucesso!'
    };
  }


  async searchFeedbacks(searchTerm: string): Promise<any[]> {
    const feedbacks = await this.prisma.feedback.findMany();

    const resultados = feedbacks.filter(feedback => {
      return feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
    });

    const comRelevancia = resultados.map(feedback => {
      const occurrences = (feedback.message.match(new RegExp(searchTerm, 'gi')) || []).length;
      return {
        ...feedback,
        relevancia: occurrences
      };
    });

    return comRelevancia.sort((a, b) => b.relevancia - a.relevancia);
  }

}

