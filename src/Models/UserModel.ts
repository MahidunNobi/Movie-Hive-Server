import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: String,
    displayName: String,
    photoURL: String,
    role: String,
});

const User = mongoose.model("users", userSchema)
export default User;