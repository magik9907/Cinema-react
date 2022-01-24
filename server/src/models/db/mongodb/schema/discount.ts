import { model, Schema } from 'mongoose';
import { Discount } from '../../../Discount';

export const DiscountSchema = new Schema<Discount>({
    type: {require: true, type: String},
    value: {require: true, type: Number},
    description: {require: true, type: String},
  isDelete:{default:false, type:Boolean}
});

export const DiscountModel = model<Discount>('discount', DiscountSchema);
