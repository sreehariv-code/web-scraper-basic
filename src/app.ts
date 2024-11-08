import express from "express";
import cors from "cors";
import config from "./config/config";
import searchRoutes from "./routes/searchRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", searchRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
