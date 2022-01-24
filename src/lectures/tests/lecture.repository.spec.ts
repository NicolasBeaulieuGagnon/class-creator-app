import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureRepository } from '../lecture.repository';

describe('Lecture Repository', () => {
  let lectureRepository: LectureRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return {
              type: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              database: 'class-creator-DB-test',
            };
          },
        }),
        TypeOrmModule.forFeature([LectureRepository]),
      ],
    }).compile();
    lectureRepository = module.get<LectureRepository>(LectureRepository);
  });

  describe('find', () => {
    it('should return an empty array if it finds nothing', async () => {
      const lectures = await lectureRepository.find();

      console.log(lectures);
      expect(lectures).toEqual([]);
    });
  });
});
