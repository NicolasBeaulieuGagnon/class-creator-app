import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { GetLectureFilterDto } from './dto/getLectureDto';
import { Lecture } from './lecture.entity';
import { LectureRepository } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private lectureRepository: LectureRepository,
  ) {}

  async getLectures(lectureFilterDto: GetLectureFilterDto, user: User) {
    return await this.lectureRepository.getLectures(lectureFilterDto, user);
  }

  async createLecture(
    createLectureDto: CreateLectureDto,
    user: User,
  ): Promise<void> {
    return this.lectureRepository.createLecture(createLectureDto, user);
  }

  async getLectureById(id: string) {
    return await this.lectureRepository.findOne({ id });
  }
}
