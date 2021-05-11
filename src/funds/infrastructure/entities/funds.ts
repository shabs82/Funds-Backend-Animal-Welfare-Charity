import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Funds {
  @PrimaryGeneratedColumn({})
  public id: number;
  @Column({ unique: true })
  public charityName: string;
  @Column({ unique: true })
  public totalIncome: number;
  @Column({ unique: true })
  public description: string;
  @Column({ unique: true })
  public website: string;
  @Column({ unique: true })
  public email: string;
  @Column({ unique: true })
  public telNumber: number;
}
