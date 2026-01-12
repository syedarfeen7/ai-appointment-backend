import express, { Application, Request, Response, NextFunction } from "express";
import connectDatabase from "./config/database.config";
import { config } from "./config/env.config";
import { HTTPStatusCodes } from "./config/http.config";
import { errorHandler } from "./shared/middlewares/errorHandler";
import routes from "./index";
import cookieParser from "cookie-parser";
import path from "path";

const app: Application = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(config.BASE_PATH, routes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
