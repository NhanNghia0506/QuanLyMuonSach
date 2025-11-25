import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, { ...req.body, imageUrl: req.file?.filename });
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            if(req.file) {
                await fs.unlink(req.file.path);
            }
            const messages = errors.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ errors: messages });
        }

        next();
    }
}

export default validateDto;