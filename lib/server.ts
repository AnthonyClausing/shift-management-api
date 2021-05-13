import env from './environment'
import app from "./config/app";

const PORT =  env.getPort();

app.get('/', async(req, res) => {
  res.send("Youre connected! Home Page")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})