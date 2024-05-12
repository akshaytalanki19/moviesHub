import User from "../models/User.js";
import { hash } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "error", cause: error.messsage });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedpassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedpassword });
        await user.save();
        return res.status(200).json({ message: "ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "error", cause: error.messsage });
    }
};
//# sourceMappingURL=user-controller.js.map