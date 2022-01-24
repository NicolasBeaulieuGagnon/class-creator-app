import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  start_date: string;

  @IsNotEmpty()
  end_date: string;
}
