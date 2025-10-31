import fs from "fs/promises";
import path from "path";
export class FileService {
    async deleteByUrl(fileUrl: string) {
        const fileName = fileUrl.split("/uploads/")[1];
        const filePath = path.join(__dirname, "../uploads", fileName!);

        try {
            await fs.unlink(filePath);
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
const fileService = new FileService();
export default fileService;