import express from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.listen(config.port, async () => {
  await mongoose.connect(config.mongo_url);
  console.log(`Listening on port ${config.port}`);
});
