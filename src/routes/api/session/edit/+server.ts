import {Session, type SessionType } from 'models/Session.js'
import { json } from '@sveltejs/kit'
export const PUT = async({request, fetch}) =>{
    const res = await request.json()
    const {data} : {data:SessionType} = await res
    try {
        const session = await Session.findOneAndUpdate({sessionId:data.sessionId},{
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
        });
        await session?.save()
        return json({success:true, session},{status:200})
    } catch (error) {
        return json({sucess: false},{status:500})
    }
}