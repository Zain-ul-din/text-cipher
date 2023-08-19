import * as dotenv from 'dotenv';
const configEnv = () => dotenv.config();
configEnv();

import express from "express";
import bodyParser from "body-parser";
import { readFileSync } from "fs";

import cipher from "./cipher";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  try {
    const { text, key } = req.query;
    if ((text as string).length > 0 && (key as string).length > 0) {
      const fileContent = readFileSync("./public/password.html", "utf-8");
      res.send(
        fileContent.replace("%password%", cipher(text as string, key as string)),
      );
      return;
    }
    throw new Error("Invalid query");
  } catch (err) {
    console.log(err)
    const fileContent = readFileSync("./public/home.html", "utf-8");
    res.send(fileContent);
  }
});

app.listen(8080, () => {
  console.log("The application is listening on port 8080!");
});
