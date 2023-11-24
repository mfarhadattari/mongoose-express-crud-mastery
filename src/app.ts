import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoute } from './modules/user/user.route';

// create app instance
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'MongooseExpress CRUD Mastery Server is running',
    data: {
      author: {
        name: 'Mohammad Farhad',
        email: 'mfarhad.dev@gmail.com',
        url: 'https:mfarhad-dev.vercel.app',
        github: 'https://github.com/mfarhadattari',
      },
    },
  });
});

export default app;
