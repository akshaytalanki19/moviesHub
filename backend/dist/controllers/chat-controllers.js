import User from "../models/User.js";
export const genarateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(401).send("user not registered or Token malfunctioned");
    }
    // grab chats of user
    //send all chats with new one to openAI Api
    //get latest response
};
//# sourceMappingURL=chat-controllers.js.map