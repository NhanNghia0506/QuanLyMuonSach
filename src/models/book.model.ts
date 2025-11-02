import { model, Schema } from "mongoose";

export interface IBook {
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
    publishAt: Date,
    publisherId: Schema.Types.ObjectId,
}

const BookSchema = new Schema<IBook>(
    {
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        publishAt: { type: Date, required: true },
        publisherId: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
    }
)

const Book = model<IBook>("Book", BookSchema, 'Sach');
export default Book;