import { Test } from '@nestjs/testing';
import { LectureRepository } from '../lecture.repository';
import { LectureService } from '../lecture.service';
import { User } from '../../auth/user.entity';
import { Lecture } from '../lecture.entity';

const mockLectureRepository = () => ({
  getLectures: jest.fn(),
  createLecture: jest.fn(),
  getLectureById: jest.fn(),
  joinLecture: jest.fn(),
  leaveLecture: jest.fn(),
});

const mockUser: User = {
  name: 'mockname',
  user_id: 'mockId',
  password: 'mockpassword',
  attending_lectures: [],
  created_lectures: [],
};

const mockLecture: Lecture = {
  lecture_id: 'mockLectureId',
  name: 'mockLectureName',
  user_id: 'mockId',
  description: 'mockDescription',
  start_date: 'mock start date',
  end_date: 'mock end date',
  students: 0,
};

describe('Lecture Service', () => {
  let lectureService: LectureService;
  let lectureRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LectureRepository,
          useFactory: mockLectureRepository,
        },
      ],
    }).compile();
    lectureService = module.get(LectureService);
    lectureRepository = module.get(LectureRepository);
  });

  describe('getLectures', () => {
    it('calls LectureRepository.find and returns the result', async () => {
      lectureRepository.find.mockResolvedValue(mockLecture);
      const result = await lectureService.getLectures(
        { enrolled: true },
        mockUser,
      );
      expect(result).toEqual(mockLecture);
    });
  });
});
