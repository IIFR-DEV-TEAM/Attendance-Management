import mongoose, {Schema, Document} from "mongoose"

interface AttendanceType extends Document {
    sessionId: string,
    userId:string,
}

const AttendanceSchema = new Schema({
    sessionId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
        
})

export const Attendance = mongoose.models.Attendance<AttendanceType> || mongoose.model<AttendanceType>("Attendance",AttendanceSchema)
export type {AttendanceType}