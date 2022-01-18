import { IsNotEmpty } from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;
}
