"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IturaController = void 0;
class IturaController {
    constructor(ituraServiceImpl) {
        this.ituraServiceImpl = ituraServiceImpl;
    }
    reply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = req.body;
            try {
                const reply = this.ituraServiceImpl.ReplyChat(message);
                res.status(200).json({ message: reply });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
}
exports.IturaController = IturaController;
