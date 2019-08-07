import {Table, Column, Model, BeforeCreate, HasOne } from 'sequelize-typescript';
import { DataType, PrimaryKey, Default, Unique, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import UserImage from './userImage';
import * as bcrypt from 'bcryptjs';

export interface UserProperties {
  id?: string;
  username: string;
  password: string;
  userImage: UserImage;
  createdAt?: Date;
  updatedAt?: Date;

  validatePassword: (password: string) => Promise<boolean>;
}

@Table({ tableName: 'User' })
export default class User extends Model<User> implements UserProperties {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.STRING)
  public id?: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public email: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  public joinDate: Date;

  @Column(DataType.DATEONLY)
  public birthday: Date;

  @Column(DataType.STRING)
  public location: string;

  @Column(DataType.STRING)
  public gender: string;

  @Column(DataType.STRING)
  public name: string;

  @HasOne(() => UserImage)
  public userImage: UserImage;

  @CreatedAt
  public createdAt?: Date;

  @UpdatedAt
  public updatedAt?: Date;

  @BeforeCreate
  private static validatePassword(instance: User): void {
    if (instance.password.length < 10) {
      throw new Error('Password too short.');
    }
  }

  @BeforeCreate
  private static async hashPassword(instance: User): Promise<void> {
    const salt = await bcrypt.genSalt();
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  public validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
