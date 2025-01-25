import { json, type RequestHandler } from '@sveltejs/kit';
import type { AttendanceType } from 'models/Attendance';
import type { SessionType } from 'models/Session';

export interface DataType {
	totalSessions:number, 
	attendedSessions: number, 
	sessions : SessionType[]
}

export const POST: RequestHandler = async ({request,fetch }) => {
	const {userId} : {userId:string} = await request.json()
	try {
		let data = {} as DataType
		const sessionsRes = await fetch("/api/session/fetch")
		const {sessions} : {sessions:SessionType[]} = await sessionsRes.json()
		if(sessions){
			data.sessions = sessions
			data.totalSessions = sessions.length
		}
		else{
			return json({success:false},{status:400})
		}
		const attendanceRes = await fetch("/api/attendance/fetch",{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({userId})
		})
		const {attendance} : {attendance:AttendanceType[]} = await attendanceRes.json()
		if(attendance){
			data.attendedSessions = attendance.length
			return json(data,{status:200})
		}
		else{
			return json({success:false},{status:400})
		}
		
	} catch (error) {
		return json({success:false},{status:500})
	}

};
