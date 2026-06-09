import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? process.env.MONGODB_URL;

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export default async function connection() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME ?? "trail",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
