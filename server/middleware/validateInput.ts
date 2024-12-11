import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateInput = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // parse all requests on the desired endpoint
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    }
    catch (error:any) {
        // invalid argument error
        res.status(400).json(error.issues);
    }

}