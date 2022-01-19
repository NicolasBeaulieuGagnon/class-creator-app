import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LectureAttendance {
  @PrimaryGeneratedColumn('increment')
  lecture_attendance_id: string;

  @Column('uuid')
  lecture_id: string;

  @Column('uuid')
  user_id: string;
}
