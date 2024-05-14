import { Configuration } from "openai";
function configureOpenAI() {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
}
//# sourceMappingURL=openai-config.js.map