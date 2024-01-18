import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { teamRouter } from "./routes/team";
import { loginRouter } from "./routes/login";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(userRouter);
app.use(teamRouter);
app.use(loginRouter)

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Deu ruim" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.BACKEND_LOCAL_PORT, () => {
      console.log("Server is running on http://localhost:" + process.env.BACKEND_LOCAL_PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
