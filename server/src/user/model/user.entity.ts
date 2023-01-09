import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity/base.entity';
import { UserRole } from './user.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  uid: string;

  @Column({ unique: true, nullable: true })
  user_Id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: true, nullable: true })
  password?: string;

  @Column({ nullable: true })
  Salutation?: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

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
