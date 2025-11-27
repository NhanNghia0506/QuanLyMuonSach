import { model, Schema } from "mongoose";

export interface IStaff {
    id?: string,
    name: string,
    email: string,
    password: string,
    role: string,
    address: string,
    phoneNumber: string,
    createdAt?: Date;
    updatedAt?: Date;
}

const StaffSchema = new Schema<IStaff>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String }
    },
    {
        timestamps: true,
    }
);

const Staff = model<IStaff>("Staff", StaffSchema, 'NhanVien');
export default Staff;