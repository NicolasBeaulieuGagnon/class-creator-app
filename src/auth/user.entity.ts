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
  user_id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @ManyToMany((_type) => Lecture, (lecture) => lecture.students)
  attending_lectures: Lecture[];

  @OneToMany((_type) => Lecture, (lecture) => lecture.user_id)
  created_lectures: Lecture[];
}
