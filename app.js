const express = require('express');
const app = express();
const PORT = 3000;

const db = require("./db"); // importing the db config

app.get('/', async(req,res) => {
  res.send("Youre connected!")
})
app.get("/users", async (req, res) => {
  const users = await db("user"); // making a query to get all users
  res.json({ users: users.map(u => {
      return {u, password_digest: "[REDACTED]"} 
    })
  });
});



app.listen(PORT, (req,res) => {
  console.log(`listening on port ${PORT}`)
})