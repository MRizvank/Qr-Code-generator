import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const port = process.env.PORT | 3000;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/", (req, res) => {
  var url = req.body.url;
  const name = url.split(".")[1];
  url='https://'+url
  console.log(url);
  var qr_svg = qr.image(url);
  qr_svg.pipe(
    fs.createWriteStream("./public/images" + "/" + name + "_qr-code" + ".png")
  );
  fs.appendFile("./url.txt", url + "\n", "utf-8", (err) => {
    if (err) throw err;
    console.log("data writed successfully");
  });
  const qr_name = "/images" + "/" + name + "_qr-code" + ".png";
  res.render("index.ejs", { IMG: qr_name });
});
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
