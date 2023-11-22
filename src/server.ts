import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

const run = async () => {
  try {
    // listing app
    app.listen(config.port, () => {
      console.log(`[SERVER] running on port ${config.port}`);
    });

    // connecting database
    await mongoose.connect(config.database_uri as string);
  } catch (error) {
    console.dir(error);
  }
};

run();
