import mongoose from 'mongoose';

let cached = global.mongoose;

const MONGODB_URI: any = process.env.DATABASE_CONNECTION;

// console.log("dsfsf" + MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // console.log("here");
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
      keepAlive: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseObj: any) => {
        return mongooseObj;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function dbMiddleware(req: any, res: any, next: any) {
  await dbConnect();
  return next();
}

export function Jsonify(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export default dbConnect;
