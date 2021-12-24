const express = require("express");
const { exec, spawn } = require('child_process');

const app = express();
  
app.post("/kost", (req, res) => {
  console.log("Connected to React");
  // for extracting data from the callback inside py.stdout.on() in line 15
  var data2send = 'zd';

  // creating a python child process
  const py = spawn("python", ["deneme.py"]);

  // when python prints data onto the console
  py.stdout.on("data", (data) => {
    data2send = data.toString();
    console.log('data2send : ',data2send)
    res.json({"king" :data2send});
  });
});
  
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}
const PORT = process.env.PORT || 3001;
  
app.listen(PORT,() => {
  const url = `http://localhost:${PORT}`
  console.log(`Server started on port ${PORT}`)
} );