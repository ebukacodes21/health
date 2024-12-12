"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IturaServiceImpl = void 0;
class IturaServiceImpl {
    ReplyChat(message) {
        let responseMessage;
        switch (message.toLowerCase()) {
            case "hi":
            case "hello":
                responseMessage =
                    "Hello! I'm Itura, your virtual assistant. How can I help you today?";
                break;
            case "what is your name?":
                responseMessage = "I am Itura, your friendly virtual assistant!";
                break;
            case "what is the weather like today?":
                responseMessage =
                    "I'm currently working on fetching the latest weather information for you!";
                break;
            case "how are you?":
                responseMessage =
                    "I'm just a bunch of code, but thanks for asking! How can I assist you?";
                break;
            default:
                responseMessage =
                    "That's an interesting question! Let me check and get back to you.";
                break;
        }
        return responseMessage;
    }
}
exports.IturaServiceImpl = IturaServiceImpl;
