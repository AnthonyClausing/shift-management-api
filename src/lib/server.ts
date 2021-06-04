import env from './environment'
import app from './config/app'
import { Request, Response } from 'express'
const PORT = env.getPort()

app.get('/', async (req: Request, res: Response) => {
  res.send("You're connected!")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
