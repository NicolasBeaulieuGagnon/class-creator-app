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
  async getLectures(search: string, creator: boolean, user: User) {
    const query = this.createQueryBuilder('lecture');

    if (creator) {
      query.andWhere({ user_id: user.user_id });
    }

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
    const { name, description, start_date, end_date } = createLectureDto;

    const lecture = this.create({
      name,
      user_id: user.user_id,
      description,
      start_date,
      end_date,
      students: [],
    });

    try {
      await this.save(lecture);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Lecture name already taken');
      } else {
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
