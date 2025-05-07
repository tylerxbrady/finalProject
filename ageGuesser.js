process.stdin.setEncoding("utf8");
const path = require("path");
const express = require("express");  
const app = express();
const bodyParser = require("body-parser"); 



app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'style')));

require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});



const portNumber = process.argv[2];

console.log(`Web server started and running at http://localhost:${portNumber}`);

const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);

process.stdin.on("readable", function () {
  const dataInput = process.stdin.read();
  if (dataInput !== null) {
    const command = dataInput.trim();
    if (command === "stop") {
        process.stdout.write("Shutting down the server\n");
        process.exit(0);
    } else {
        process.stdout.write(`Invalid command: ${command}\n`);
    }
    process.stdout.write(prompt);
    process.stdin.resume();
  }
});

const form = require("./routes/form")(portNumber);
const response = require("./routes/response");

const res = require("./routes/receive");

app.get("/", (request, response) => {
  response.render("home", {port: portNumber});
});

//use form.js to handle ends starting with form
app.use("/form", form);

app.use("/response", response);

app.use("/receive", res);

app.listen(portNumber);