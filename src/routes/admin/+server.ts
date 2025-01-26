import { json ,type RequestHandler } from "@sveltejs/kit";
import type { SessionType } from "models/Session";

export const GET : RequestHandler = async({fetch}) =>{
    try {
        const res = await fetch("/api/session/fetch")
        const {sessions} : {sessions:SessionType[]} = await res.json()
        const formattedSessions = sessions.map((session) => ({
            sid: session.sessionId,
            date: session.date,
            startTime: session.startTime,
            endTime: session.endTime,
            status: new Date(`${session.date}T${session.endTime}`) > new Date() ? 'active' : 'expired'
          }));
          formattedSessions.sort((a,b)=>{
            const dateA = new Date(`${a.date}T${a.startTime}`)
            const dateB = new Date(`${b.date}T${b.startTime}`)
            return dateB.getTime() - dateA.getTime()
          })
          return json({success:true, formattedSessions})
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return json({ error: 'Failed to fetch sessions' }, { status: 500 });
    }


}