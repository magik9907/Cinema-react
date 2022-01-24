import { model, Schema } from 'mongoose';
import { Film } from '../../../film';

export const FilmSchema = new Schema<Film>({
  director: {
    type: String,
  },
  title: { require: true, type: String },
  length: { require: true, type: Number },
  isDelete:{default:false, type:Boolean}
});

export const FilmModel = model<Film>('film', FilmSchema);
