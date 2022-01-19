import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Raw } from 'typeorm';
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
    const { enrolled, search, creator } = lectureFilterDto;

    if (enrolled) {
      const results = await this.lectureAttendanceRepository.find({
        where: { user_id: user.user_id },
      });
      const resultIds = results.map((result) => {
        return result.lecture_id;
      });
      return await this.lectureRepository.find({
        lecture_id: Raw((alias) => `${alias} IN (:...lecture_ids)`, {
          lecture_ids: resultIds,
        }),
      });
    } else {
      const arrayOfLectures = await this.lectureRepository.getLectures(
        search,
        creator,
        user,
      );
      let promises = [];

      arrayOfLectures.forEach((lecture) => {
        promises.push(
          this.lectureAttendanceRepository.getAmountOfAttendees(
            lecture.lecture_id,
          ),
        );
      });

      const results = await Promise.all(promises);

      return arrayOfLectures.map((lecture, index) => {
        return { ...lecture, students: results[index] };
      });
    }
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
