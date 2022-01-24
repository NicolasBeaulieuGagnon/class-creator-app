import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureRepository } from './lecture.repository';
import { User } from '../auth/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LectureAttendanceRepository } from './lecture-attendance.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      User,
      LectureRepository,
      LectureAttendanceRepository,
    ]),
  ],
  providers: [LectureService],
  controllers: [LectureController],
})
export class LectureModule {}
