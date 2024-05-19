import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, requried: true, unique: true },
  password: { type: String, requred: true },
});
const User = models.User || model("User", UserSchema);

export default User;
