import nextConnect from 'next-connect';

import { dbMiddleware } from './database';

export default function createHandler(...middlewares: any[]) {
  return nextConnect().use(dbMiddleware, ...middlewares);
}
