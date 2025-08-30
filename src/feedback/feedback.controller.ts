import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Request() req) {
    const userId = req.user.id;
    return this.feedbackService.create(createFeedbackDto, req.user);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sender') sender?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
  ) {
    // Converter strings para números e definir padrões
    const pageNumber = page ? parseInt(page) : 1;        // padrão: página 1
    const limitNumber = limit ? parseInt(limit) : 10;     // padrão: 10 por página
    const orderDirection = order || 'desc';               // padrão: mais recentes primeiro
    const sortBy = orderBy || 'createdAt';                // padrão: ordenar por data

    return this.feedbackService.findAll(pageNumber, limitNumber, sender, sortBy, orderDirection);
  }

  @Get('sender/:senderId')
  findBysender(@Param('senderId') senderId: string) {
    return this.feedbackService.findBySender(senderId);
  }

  @Get('ranking')
  getRanking(){
    return this.feedbackService.findByRanking();
  }

  @Get('search')
  async search(@Query('q') searchTerm: string){
    return this.feedbackService.searchFeedbacks(searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  // 👍 ENDPOINT PARA CURTIR FEEDBACK
  @Post(':id/like')
  async likeFeedback(@Param('id') feedbackId: string, @Request() req) {
    return this.feedbackService.likeFeedback(feedbackId, req.user.id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto, @Request() req) {
    return this.feedbackService.update(id, updateFeedbackDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }

}