import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne((_type) => User, (user) => user.CreatedLectures, { eager: true })
  creator: User;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToMany((_type) => User, (user) => user.AttendingLectures)
  students: User[];
}
