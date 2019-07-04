import {Table, Column, Model, BeforeCreate, HasMany } from 'sequelize-typescript';
import { DataType, PrimaryKey, Default, Unique, AllowNull, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import Event from './event';

export interface UserProperties {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  validatePassword: (password) => Promise<boolean>;
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
