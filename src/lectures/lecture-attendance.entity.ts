import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LectureAttendance {
  @PrimaryGeneratedColumn('uuid')
  lecture_id: string;

  @Column('uuid')
  user_id: string;
}
