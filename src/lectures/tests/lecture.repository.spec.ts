import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { LectureAttendanceRepository } from '../lecture-attendance.repository';
import { Lecture } from '../lecture.entity';
import { LectureRepository } from '../lecture.repository';
import { mockUser } from './lecture.mocks';

const mockLectureRepoObject: Lecture = {
  lecture_id: '25740dc0-44dc-4f11-b5d6-1ccfe4a06abb',
  name: 'class name',
  user_id: 'aa36d01b-f427-4366-ae03-250d7edd70de',
  description: 'some description',
  start_date: '235576',
  end_date: ' 325346',
  students: 0,
};

const mockUserRepoObject: User = {
  ...mockUser,
  user_id: 'aa36d01b-f427-4366-ae03-250d7edd70de',
};

describe('Lecture Repository', () => {
  let lectureRepository: LectureRepository;
  let entity: Repository<Lecture>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'class-creator-test-DB',
          dropSchema: true,
          entities: [Lecture],
          synchronize: true,
          autoLoadEntities: true,
          keepConnectionAlive: false,
        }),
        TypeOrmModule.forFeature([
          Lecture,
          LectureRepository,
          LectureAttendanceRepository,
        ]),
      ],
    }).compile();
    lectureRepository = module.get(LectureRepository);
    entity = module.get(getRepositoryToken(Lecture));
  });

  it('should be defined', () => {
    expect(lectureRepository).toBeDefined();
  });

  afterEach(async () => {
    await entity.manager.connection.close();
  });

  describe('getLectures', () => {
    it('should return an empty array if no lectures were found', async () => {
      const result = await lectureRepository.getLectures(
        '',
        false,
        mockUserRepoObject,
      );

      expect(result).toEqual([]);
    });
  });

  describe('createLecture', () => {
    it('should create an new lecture and return nothing', async () => {
      const result = await lectureRepository.createLecture(
        mockLectureRepoObject,
        mockUserRepoObject,
      );

      expect(result).toEqual(undefined);
    });
  });

  describe('', () => {});
});
