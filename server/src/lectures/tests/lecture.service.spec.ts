import { Test } from '@nestjs/testing';
import { LectureRepository } from '../lecture.repository';
import { LectureService } from '../lecture.service';
import { LectureAttendanceRepository } from '../lecture-attendance.repository';
import {
  mockLecture,
  mockUser,
  mockLectureAttendance,
  mockCreateLecture,
} from './lecture.mocks';

const mockLectureRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  getLectures: jest.fn(),
  createLecture: jest.fn(),
});

const mockLectureAttendanceRepository = () => ({
  find: jest.fn(),
  createAttendee: jest.fn(),
  deleteAttendee: jest.fn(),
  getAmountOfAttendees: jest.fn(),
});

describe('Lecture Service', () => {
  let lectureService: LectureService;
  let lectureRepository;
  let lectureAttendanceRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LectureRepository,
          useFactory: mockLectureRepository,
        },
        {
          provide: LectureAttendanceRepository,
          useFactory: mockLectureAttendanceRepository,
        },
      ],
    }).compile();
    lectureService = module.get(LectureService);
    lectureRepository = module.get(LectureRepository);
    lectureAttendanceRepository = module.get(LectureAttendanceRepository);
  });

  describe('getLectures', () => {
    it('should return an array of lectures the user is enrolled in', async () => {
      lectureAttendanceRepository.find.mockResolvedValue([
        mockLectureAttendance,
      ]);
      lectureRepository.find.mockResolvedValue([mockLecture]);
      const result = await lectureService.getLectures(
        { enrolled: true },
        mockUser,
      );
      expect(result).toEqual([mockLecture]);
    });

    it('should return an array of lectures the user has created with the amount of students attending each lecture', async () => {
      lectureRepository.getLectures.mockResolvedValue([mockLecture]);
      lectureAttendanceRepository.getAmountOfAttendees.mockResolvedValue(1);
      const result = await lectureService.getLectures(
        { creator: true },
        mockUser,
      );

      expect(result).toEqual([{ ...mockLecture, students: 1 }]);
    });

    it('should return all lectures that match filter', async () => {
      lectureRepository.getLectures.mockResolvedValue([mockLecture]);
      lectureAttendanceRepository.getAmountOfAttendees.mockResolvedValue(0);
      const result = await lectureService.getLectures(
        { search: 'mock' },
        mockUser,
      );
      expect(result).toEqual([mockLecture]);
    });
    it('should return all lectures', async () => {
      lectureRepository.getLectures.mockResolvedValue([mockLecture]);
      lectureAttendanceRepository.getAmountOfAttendees.mockResolvedValue(0);
      const result = await lectureService.getLectures({}, mockUser);
      expect(result).toEqual([mockLecture]);
    });
    it('returns message saying no lectures were found with that filter', async () => {
      lectureRepository.getLectures.mockResolvedValue([]);
      const result = await lectureService.getLectures(
        { search: '2346hbdffwer' },
        mockUser,
      );

      expect(result).toEqual({
        message: "no lectures were found. Search : ' 2346hbdffwer '",
      });
    });
  });

  describe('createLecture', () => {
    it('should return nothing if created successfully', async () => {
      lectureRepository.createLecture.mockResolvedValue(undefined);
      const result = await lectureService.createLecture(
        mockCreateLecture,
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
    it('should return an error if one the fields are empty', async () => {
      lectureRepository.createLecture.mockResolvedValue(new Error());
      const result = await lectureService.createLecture(
        { ...mockCreateLecture, name: '' },
        mockUser,
      );
      expect(result).toEqual(new Error());
    });
  });

  describe('getLectureById', () => {
    it('returns the lecture based on the id given', async () => {
      lectureRepository.findOne.mockResolvedValue(mockLecture);

      const result = await lectureService.getLectureById('mockLectureId');
      expect(result).toEqual(mockLecture);
    });

    it('returns an empty array if no lectures were found', async () => {
      lectureRepository.findOne.mockResolvedValue([]);

      const result = await lectureService.getLectureById('wrongId');

      expect(result).toEqual([]);
    });
  });

  describe('joinLecture', () => {
    it('adds the user to attendees and returns nothing', async () => {
      lectureAttendanceRepository.createAttendee.mockResolvedValue(undefined);

      const result = await lectureService.joinLecture(
        'mockLectureId',
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
  });

  describe('leaveLecture', () => {
    it('removes the user from the attendees and returns nothing', async () => {
      lectureAttendanceRepository.deleteAttendee.mockResolvedValue(undefined);

      const result = await lectureService.leaveLecture(
        'mockLectureId',
        mockUser,
      );

      expect(result).toEqual(undefined);
    });
  });
});
