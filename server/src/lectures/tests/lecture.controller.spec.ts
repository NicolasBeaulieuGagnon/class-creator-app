import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { LectureController } from '../lecture.controller';
import { LectureService } from '../lecture.service';
import { mockCreateLecture, mockLecture, mockUser } from './lecture.mocks';

const mockLectureService = () => ({
  getLectures: jest.fn(),
  createLecture: jest.fn(),
  getLectureById: jest.fn(),
  joinLecture: jest.fn(),
  leaveLecture: jest.fn(),
});

describe('Lecture Controller', () => {
  let lectureController: LectureController;
  let lectureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: LectureService,
          useFactory: mockLectureService,
        },
      ],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [LectureController],
    }).compile();
    lectureController = module.get(LectureController);
    lectureService = module.get(LectureService);
  });

  describe('createLecture', () => {
    it('creates a lecture and returns undefined', async () => {
      lectureService.createLecture.mockResolvedValue(undefined);
      const result = await lectureController.createLecture(
        mockCreateLecture,
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
  });

  describe('joinLecture', () => {
    it('adds user and returns nothing', async () => {
      lectureService.joinLecture.mockResolvedValue(undefined);

      const result = await lectureController.joinLecture(
        'mockLectureId',
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
  });

  describe('leaveLecture', () => {
    it('removes user from lecture and returns nothing', async () => {
      lectureService.leaveLecture.mockResolvedValue(undefined);

      const result = await lectureController.leaveLecture(
        'mockLectureId',
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
  });

  describe('getLectures', () => {
    it('gets lectures and returns an array of them', async () => {
      lectureService.getLectures.mockResolvedValue([mockLecture]);

      const result = await lectureController.getLectures({}, mockUser);

      expect(result).toEqual([mockLecture]);
    });
  });

  describe('getLectureById', () => {
    it('gets a lecture by its id and returns it', async () => {
      lectureService.getLectureById.mockResolvedValue(mockLecture);
      const result = await lectureController.getLectureById('mockLectureId');

      expect(result).toEqual(mockLecture);
    });
  });
});
