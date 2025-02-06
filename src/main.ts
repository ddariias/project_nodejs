import express from "express";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { config } from "./configs/config";
import { authRouter } from "./routers/auth.router";
import { postRouter } from "./routers/post.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(config.port, async () => {
  await mongoose.connect(config.mongo_url);
  console.log(`Listening on port ${config.port}`);
});
