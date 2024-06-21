import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// default route
app.get("/", (req: Request, res: Response) => {
  // Constructing server status object
  const serverStatus = {
    status: "Server is running!",
    message: "Assignment- 3 API is operational and running smoothly.",
    timestamp: new Date().toISOString(),
    version: "v1.0.1",
    uptime: process.uptime(),
    author: "MD HASAN",
    contact: {
      email: "ornilhasan.oht.riyad@gmail.com",
      website: "https://mdhasan-portfolio.vercel.app/",
    },
  };
  res.json(serverStatus);
});

// test route
const test = (req: Request, res: Response) => {
  const message = "Yes it's working correctly";
  res.status(200).json({ message });
  // Promise.reject();
};

// application routes
app.use("/api/", router);
app.get("/test", test);

// not found route
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
