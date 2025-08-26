import {IsNotEmpty} from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  message:string;

  
}

