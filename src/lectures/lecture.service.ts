import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { GetLectureFilterDto } from './dto/getLectureDto';
import { LectureAttendanceRepository } from './lecture-attendance.repository';
import { LectureRepository } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private lectureRepository: LectureRepository,
    private lectureAttendanceRepository: LectureAttendanceRepository,
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
    return await this.lectureRepository.findOne({ lecture_id: id });
  }

  async joinLecture(id: string, user: User): Promise<void> {
    return this.lectureAttendanceRepository.createAttendee(id, user);
  }

  async leaveLecture(id: string, user: User) {
    return this.lectureAttendanceRepository.deleteAttendee(id, user);
  }
}
