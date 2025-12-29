import express, { Application, Request, Response, NextFunction } from "express";
import connectDatabase from "./config/database.config";
import { config } from "./config/env.config";
import { HTTPStatusCodes } from "./config/http.config";
import { errorHandler } from "./common/middlewares/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import activityRoutes from "./modules/activity/activity.routes";
import cookieParser from "cookie-parser";

const app: Application = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/activity`, activityRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({ status: "OK" });
});

app.use(errorHandler);

console.log(config.APP_ORIGIN);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("Database connected");

    app.listen(config.PORT, () => {
      console.log(
        `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
