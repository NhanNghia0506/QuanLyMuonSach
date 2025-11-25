import fs from "fs";
import path from "path";
export class FileService {
    async deleteByUrl(fileUrl: string): Promise<boolean> {
        try {
            let fileName = fileUrl.includes("/uploads/")
                ? fileUrl.split("/uploads/")[1]
                : fileUrl;
            const filePath = path.join(__dirname, "../../uploads", fileName!);
            if(fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
                return true;
            }
            return false;
        }catch (error: any) {
            return false;
        }
    }
}
const fileService = new FileService();
export default fileService;