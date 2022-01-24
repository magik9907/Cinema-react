import { model, Schema } from 'mongoose';
import { Hall } from '../../../Hall';

export const HallSchema = new Schema<Hall>({
  capacity: { require: true, type: Number },
  number: { require: true, type: Number },
  isDelete: { default: false, type: Boolean },
});

export const HallModel = model<Hall>('hall', HallSchema);
