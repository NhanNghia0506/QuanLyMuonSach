import { Document, model, Schema } from "mongoose";

export interface IReader extends Document {
    name: string,
    email: string,
    password: string,
    gender?: 'Nam' | 'Nữ',
    dateOfBirth?: Date,
    address: string,
    phoneNumber: string,
    createdAt?: Date;
    updatedAt?: Date;
}

const ReaderSchema = new Schema<IReader>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        gender: { type: String, enum: ['Nam', 'Nữ'], default: 'Nam' },
        dateOfBirth: { type: Date },
        address: { type: String }
    },
    {
        timestamps: true,
    }
)

const Reader = model<IReader>("Reader", ReaderSchema, 'DocGia');
export default Reader;