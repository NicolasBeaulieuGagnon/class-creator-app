import { Lecture } from '../lectures/lecture.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @ManyToMany((_type) => Lecture, (lecture) => lecture.students)
  AttendingLectures: Lecture[];

  @OneToMany((_type) => Lecture, (lecture) => lecture.creator)
  CreatedLectures: Lecture[];
}
