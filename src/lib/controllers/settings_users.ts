// import LocationUserShift from '../models/locationUserShift'
import User from '../models/user'
import Location from '../models/location'
import { Request, Response } from 'express';

const index = async(req: Request, res: Response) => {
  try{
    // const users = await User.findBy(request.params.location_id)
    // response.status(200).json(shifts)
  }catch(e){
    res.json({"status": 400, "error": e.message})
  }
}
const locations = async(req: Request, res: Response) => {
  //get specific user's locations?
  try{
    // const users = await User.findBy(request.params.location_id)
    // response.status(200).json(shifts)
  }catch(e){
    res.json({"status": 400, "error": e.message})
  }
}

const create = async(req: Request, res: Response) => {
  //create user with given info + temp password 
  // email user's email
  try{
    // const newUser = await User.create({...request.body, ...request.params})
    res.status(201)//.json({ shift: newShift })
  }catch(e){
    res.json({"status": 400, "error": e.message})
  }
}


export default {index, create}