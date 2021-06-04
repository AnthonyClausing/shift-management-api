import LocationUserShift from '../models/locationUserShift'
import {Request, Response} from 'express';

const index = async(req: Request, res: Response) => {
  try{
    const shifts = await LocationUserShift.findAll(req.params.location_id)
    res.status(200).json(shifts)
  }catch(e){
    res.json({"status": 400, "error": e.message})
  }
}

const create = async(req: Request, res: Response) => {
  try{
    const newShift = await LocationUserShift.create({...req.body, ...req.params})
    res.status(201).json({ shift: newShift })
  }catch(e){
    res.json({"status": 400, "error": e.message})
  }
}


export default {index, create}