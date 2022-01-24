import { model, Schema } from 'mongoose';
import { Ticket } from '../../../Ticket';
import { Discount } from '../../../Discount';
import { Seans } from '../../../Seans';

export const TicketSchema = new Schema<Ticket>({
  name: { require: true, type: String },
  surname: { require: true, type: String },
  discount: { type: Schema.Types.ObjectId },
  seans: { require: true, type: Schema.Types.ObjectId },
  seatNo: { require: true, type: Number },
  isDelete: { default: false, type: Boolean },
});

export const TicketModel = model<Ticket>('ticket', TicketSchema);
