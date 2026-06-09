import mongoose, { type InferSchemaType } from "mongoose";

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export type WaitlistDocument = InferSchemaType<typeof waitlistSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Waitlist =
  mongoose.models.Waitlist ||
  mongoose.model("Waitlist", waitlistSchema, "waitlist");

export default Waitlist;
