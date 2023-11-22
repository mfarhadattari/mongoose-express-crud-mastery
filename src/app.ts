import cors from 'cors';
import express, { Application, Request, Response } from 'express';

// create app instance
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('MongooseExpress CRUD Mastery Server is running');
});

export default app;
