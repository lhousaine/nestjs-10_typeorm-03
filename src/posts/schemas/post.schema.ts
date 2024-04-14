import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class PostSchema {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}