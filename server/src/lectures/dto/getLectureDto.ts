import { IsOptional } from 'class-validator';

export class GetLectureFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  enrolled?: boolean;

  @IsOptional()
  creator?: boolean;
}
