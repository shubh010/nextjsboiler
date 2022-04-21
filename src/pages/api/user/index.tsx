import createHandler from '@/middleware';
import User from '@/models/User';

const handler = createHandler();

handler.post(async (req: any, res: any) => {
  const user = new User(req.body);
  user
    .save()
    .then((data: any) => res.status(201).json({ message: 'User Saved', data }))
    .catch((err: any) =>
      res.status(500).json({ message: 'Something went wrong.', err })
    );
});

// handler.get(async (req: any, res: any) => {
//   return res.status(200).json({ message: 'Hello there' });
// });

export default handler;
