const path = require("path");
const express = require("express");  
const app = express();
const bodyParser = require("body-parser"); 

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'style')));


const form = require("./routes/form");
const response = require("./routes/response");

const res = require("./routes/receive");

app.get("/", (request, response) => {
  response.render("home");
});


app.use("/form", form);

app.use("/response", response);

app.use("/receive", res);

app.listen(PORT);