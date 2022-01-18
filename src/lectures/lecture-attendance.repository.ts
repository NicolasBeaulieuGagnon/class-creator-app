import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LectureAttendance } from './lecture-attendance.entity';

import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(LectureAttendance)
export class LectureAttendanceRepository extends Repository<LectureAttendance> {
  private logger = new Logger('Lecture Attendance Repository');

  async createAttendee(lecture_id: string, user: User): Promise<void> {
    const attendee = this.create({ lecture_id, user_id: user.user_id });
    try {
      await this.save(attendee);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteAttendee(lecture_id: string, user: User): Promise<void> {
    const result = await this.delete({ lecture_id, user_id: user.user_id });

    if (result.affected === 0) {
      throw new ConflictException('seems there is nothing to delete');
    }
  }
}
