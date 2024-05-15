import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate,chatCompletionValidator } from "../utils/validators.js";
import { genarateChatCompletion } from "../controllers/chat-controllers.js";

const chatRoutes=Router();
chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken,genarateChatCompletion);

export default chatRoutes;