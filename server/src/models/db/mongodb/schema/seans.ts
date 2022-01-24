import { model, Schema } from 'mongoose';
import { Seans } from '../../../Seans';

export const SeansSchema = new Schema<Seans>({
  date: {
    time: { type: 'string', required: true },
    date: { type: 'string', required: true },
  },
  endDate: {
    time: { type: 'string', required: true },
    date: { type: 'string', required: true },
  },
  film: { type: Schema.Types.ObjectId, ref: 'film' },
  hall: { type: Schema.Types.ObjectId, ref: 'hall' },
  ticketPrice: {type: 'number', default: 20},
  isDelete:{default:false, type:Boolean}
});

export const SeansModel = model<Seans>('seans', SeansSchema);
