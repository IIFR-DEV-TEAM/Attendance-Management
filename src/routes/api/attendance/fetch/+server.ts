import {json, type RequestHandler} from "@sveltejs/kit"
import { Attendance } from "models/Attendance"

export const POST : RequestHandler = async({request}) =>{
    const {userId} : {userId:string} = await request.json()
    try {
      const attendance = await Attendance.find({userId})
      if(attendance){
        return json({success:true,attendance},{status:200})
      }
      else{
        return json({success:true},{status:200})
      }
    } catch (error) {
      return json({success:false},{status:400})
    }
  }
  