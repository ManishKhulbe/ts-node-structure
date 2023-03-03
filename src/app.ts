import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import { config } from "dotenv";
import mongoose from "mongoose";
// import compression from "compression";
// import cors from "cors";
// import morgan from "morgan";
// import controller from '@utils/interfaces/controller.interface';
// import errorMiddleware from '@middlewares/error.middleware';
// import helmet from 'helmet';
// npx tsc --init
config();

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Not Found"));
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

const PORT: Number = Number(process.env.PORT) || 3000;
const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
