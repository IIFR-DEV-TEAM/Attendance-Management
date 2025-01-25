import {json, type RequestHandler } from "@sveltejs/kit";
import { Attendance } from "models/Attendance";
export const POST: RequestHandler = async({request}) =>{

    const {sessionId,userId}:{sessionId:string,userId:string} = await request.json()
    try {
        const attendance = await Attendance.findOne({sessionId : sessionId,userId : userId})
        if(attendance){
            return json({success:false},{status:400})
        }
        else{
            const newAttendance = new Attendance({sessionId,userId})
            await newAttendance.save()
            return json({success:true},{status:200})
        }
    } catch (error) {
        return json({success:false},{status:500})
    }
        

}