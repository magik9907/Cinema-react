import { model, Schema } from 'mongoose';

export interface Film {
  _id: string;
  title: string;
  length: number;
  director?: string;
  isDelete?:boolean
}
