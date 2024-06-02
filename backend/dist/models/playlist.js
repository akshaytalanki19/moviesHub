import mongoose from "mongoose";
const playListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    imdbid: {
        type: String,
        required: true,
        unique: true,
    },
});
export default mongoose.model("PlayList", playListSchema);
//# sourceMappingURL=playlist.js.map