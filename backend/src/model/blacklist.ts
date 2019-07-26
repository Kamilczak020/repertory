import {Table, Column, Model } from 'sequelize-typescript';
import { DataType, PrimaryKey, Default, Unique, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export interface BlacklistProperties {
  id?: string;
  token: string;
}

@Table({ tableName: 'Blacklist' })
export default class Blacklist extends Model<Blacklist> implements BlacklistProperties {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.STRING)
  public id?: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public token: string;

  @CreatedAt
  public createdAt?: Date;

  @UpdatedAt
  public updatedAt?: Date;
}
