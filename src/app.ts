import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as middlewares from './middlewares';
import api from './api';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import apiSpec from './openapi.spec.json';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(
    OpenApiValidator.middleware({
        apiSpec: apiSpec as OpenAPIV3.Document,
        validateRequests: true, // (default)
        validateResponses: true, // false by default
    }),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use('/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
