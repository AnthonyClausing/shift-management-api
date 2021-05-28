import LocationUserShift from '../models/locationUserShift'
import { request, response } from 'express';

const index = async(request, response) => {
  try{
    const shifts = await LocationUserShift.findAll(request.params.location_id)
    response.status(200).json(shifts)
  }catch(e){
    response.json({"status": 400, "error": e.message})
  }
}

const create = async(request, response) => {
  try{
    const newShift = await LocationUserShift.create({...request.body, ...request.params})
    response.status(201).json({ shift: newShift })
  }catch(e){
    response.json({"status": 400, "error": e.message})
  }
}


export default {index, create}