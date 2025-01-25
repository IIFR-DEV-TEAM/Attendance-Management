import { json, type RequestHandler } from '@sveltejs/kit';
import {Attendance} from "models/Attendance"
export const POST : RequestHandler = async({request}) =>{
  const {sessionId,userId} : {sessionId:string,userId:string} = await request.json()
  try {
    const attendance = await Attendance.findOne({sessionId,userId})
    if(attendance){
      return json({success:true}, {status:200})
    }
    else{
      return json({success:false},{status:404})
    }
  } catch (error) {
    return json({success:false},{status:500})
  }
}
