import {Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataType, PrimaryKey, Default, Unique, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import User from './user';

export interface UserImageProperties {
  id?: string;
  data: Buffer;
  userId: string;
}

@Table({ tableName: 'UserImage' })
export default class UserImage extends Model<UserImage> implements UserImageProperties {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.STRING)
  public id?: string;

  @AllowNull(false)
  @Column(DataType.BLOB)
  public data: Buffer;

  @ForeignKey(() => User)
  @Column
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @CreatedAt
  public createdAt?: Date;

  @UpdatedAt
  public updatedAt?: Date;
}
