import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connectoins and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("server started & connected to database :)"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map