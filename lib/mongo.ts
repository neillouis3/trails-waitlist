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
    cached.promise = mongoose
      .connect(uri, {
        dbName: process.env.MONGODB_DB_NAME ?? "trail",
        serverSelectionTimeoutMS: 8000,
      })
      .catch((error) => {
        // Don't cache a failed connection — let the next request retry.
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
