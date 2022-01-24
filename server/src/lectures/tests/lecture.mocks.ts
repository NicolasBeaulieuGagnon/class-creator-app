import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { Lecture } from '../lecture.entity';

export const mockUser: User = {
  name: 'mockname',
  user_id: 'mockId',
  password: 'mockpassword',
  attending_lectures: [],
  created_lectures: [],
};

export const mockLecture: Lecture = {
  lecture_id: 'mockLectureId',
  name: 'mockLectureName',
  user_id: 'mockId',
  description: 'mockDescription',
  start_date: 'mock start date',
  end_date: 'mock end date',
  students: 0,
};

export const mockLectureAttendance = {
  lecture_id: 'some mock lecture id',
  user_id: 'some mock user id',
};

export const mockCreateLecture: CreateLectureDto = {
  name: 'mock lecture',
  description: 'moc description',
  start_date: '1225',
  end_date: '3461',
};
