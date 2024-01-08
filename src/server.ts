import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;
app.use(errorHandler);
app.use(userRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
