import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as middlewares from './middlewares';
import api from './api';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
