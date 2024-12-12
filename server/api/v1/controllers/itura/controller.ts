import { Request, Response } from "express";
import { IturaServiceImpl } from "../../serviceImpl/ituraServiceImpl";
import { IturaInput } from "../../../../schema/itura.schema";

export class IturaController {
    private ituraServiceImpl: IturaServiceImpl
    constructor(ituraServiceImpl: IturaServiceImpl){
        this.ituraServiceImpl = ituraServiceImpl
    }

    public async reply(req: Request<{}, {}, IturaInput['body']>, res: Response) {
        const { message } = req.body

        try {
            const reply = this.ituraServiceImpl.ReplyChat(message)
            res.status(200).json({ message: reply })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}