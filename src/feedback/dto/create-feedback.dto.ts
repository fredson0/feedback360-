import {IsNotEmpty,IsOptional} from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  message:string;

  @IsOptional()
  sender?: string;
}

