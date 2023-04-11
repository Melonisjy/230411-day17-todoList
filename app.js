const express = require("express");
const todoRouter = require("./routes/todo");

const port = 3010;

const app = express();

app.use(express.json());
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
