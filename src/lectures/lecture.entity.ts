import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  lecture_id: string;

  @Column({ unique: true })
  name: string;

  @Column('uuid')
  user_id: string;

  @Column()
  description: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  students: number;
}
