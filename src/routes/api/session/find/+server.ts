import {json, type RequestHandler} from "@sveltejs/kit"
import {Session} from "models/Session"

export const POST : RequestHandler = async({request}) =>{
    try {
        const {sessionId} : {sessionId: string} = await request.json()
        const session = await Session.findOne({sessionId})
        if(session){
            return json({success:true, session},{status:200})
        }
        else{
            return json({success:true},{status:400})
        }
    } catch (error) {
        return json({success:false},{status:500})
    }

}