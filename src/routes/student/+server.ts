import { json, type RequestHandler } from "@sveltejs/kit";
import {User} from "models/User";

export const POST : RequestHandler = async({request,fetch}) =>{
    const {userId, sessionId} : {userId:string, sessionId:string} = await request.json()
    try {
        const user = await User.findOne({userId:userId})
        if(!user){
            return json({success:false},{status:400})
        }
        const res = await fetch("/api/attendance/create",
            {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({sessionId,userId})
            }
        )
        const {success} : {success:boolean} = await res.json()
        if(success){
            user.attendancecount+= 1
            await user.save()
            return json({success:true},{status:200})
        }
        else{
            return json({success:false},{status:400})
        }
        
    } catch (error) {
        return json({success:false},{status:500})
    }
    
}