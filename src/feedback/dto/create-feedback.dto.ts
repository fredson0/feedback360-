import {IsNotEmpty, IsString, IsOptional, IsNumber, IsUUID} from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsUUID()
  recipientId?: string;
}

