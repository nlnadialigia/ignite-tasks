import express from "express";
import router from "./routes";
import bodyParser = require("body-parser");

const app = express();

// JSON
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("trust proxy", 1);
app.use(router);

app.listen(3333, () => {
  console.log("Serving is running! ◌ ◌ ◌");
});
