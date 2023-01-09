import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity/base.entity';
import { MartialStatusType, UserRole } from './user.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: true })
  user_Id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: true, nullable: true })
  password?: string;

  @Column({ nullable: true })
  salutation?: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  postal_code?: string;

  @Column({ nullable: true })
  nat?: string;

  @Column({ nullable: true })
  dob?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  spouse_salutation?: string;

  @Column({ nullable: true })
  spouse_first_name?: string;

  @Column({ nullable: true })
  spouse_last_name?: string;

  @Column({ nullable: true })
  hobbies?: string;

  @Column({ nullable: true })
  sport?: string;

  @Column({ nullable: true })
  music?: string;

  @Column({ nullable: true })
  movie?: string;

  @Column({ default: MartialStatusType.SINGLE, nullable: true })
  martial_status?: string;

  @Column({ default: UserRole.CUSTOMER })
  role: UserRole;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  userIdToLowerCase() {
    this.user_Id = this.user_Id.toLowerCase();
  }
}
