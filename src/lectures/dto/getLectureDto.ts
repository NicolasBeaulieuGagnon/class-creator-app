import { IsOptional } from 'class-validator';

export class GetLectureFilterDto {
  @IsOptional()
  search?: string;
}
