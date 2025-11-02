import { model, Schema } from "mongoose";

export interface IPublisher {
    name: string,
    address: string,
}

const PublisherSchema = new Schema<IPublisher>(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
    }
)

const Publisher = model<IPublisher>("Publisher", PublisherSchema, 'NhaXuatBan');
export default Publisher;