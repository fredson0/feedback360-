import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
