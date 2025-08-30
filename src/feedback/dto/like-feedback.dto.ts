import { IsNotEmpty, IsString } from 'class-validator';

export class LikeFeedbackDto {
  @IsNotEmpty()
  @IsString()
  feedbackId: string;
}

export class UnlikeFeedbackDto {
  @IsNotEmpty()
  @IsString()
  feedbackId: string;
}

// DTO para resposta de like
export class LikeResponseDto {
  liked: boolean;
  likesCount: number;
  message: string;
}

// DTO para listar usuários que curtiram
export class FeedbackLikesDto {
  id: string;
  userId: string;
  userName: string;
  createdAt: Date;
}
