import { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: String, required: true }, //need to change
  calories: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  fatigue: { type: Number, required: true },
  notes: { type: String },
}); //add date and time for the exercise

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);
export default Exercise;
