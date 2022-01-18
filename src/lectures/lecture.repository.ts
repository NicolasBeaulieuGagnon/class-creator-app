import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { GetLectureFilterDto } from './dto/getLectureDto';
import { Lecture } from './lecture.entity';

import { Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@EntityRepository(Lecture)
export class LectureRepository extends Repository<Lecture> {
  private logger = new Logger('Lecture Repository');
  async getLectures(lectureFilterDto: GetLectureFilterDto, user: User) {
    const { search } = lectureFilterDto;
    const query = this.createQueryBuilder('lecture');

    query.where({ creator: user });
    if (search) {
      query.andWhere(
        'LOWER(lecture.name) LIKE :search OR LOWER(lecture.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    try {
      return await query.getMany();
    } catch (err) {
      this.logger.error(
        `Failed to load Lectures for user. Filters: ${JSON.stringify(search)}`,
      );
    }
  }

  async createLecture(
    createLectureDto: CreateLectureDto,
    user: User,
  ): Promise<void> {
    const { name, description, startDate, endDate } = createLectureDto;

    const lecture = this.create({
      name,
      creator: user,
      description,
      startDate,
      endDate,
      students: [],
    });

    try {
      await this.save(lecture);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Lecture name already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
