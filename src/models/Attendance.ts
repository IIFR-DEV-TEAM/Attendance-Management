import mongoose, {Schema, Document, Model} from "mongoose"

interface AttendanceType extends Document{
    sessionId: string,
    userId:string,
}

const AttendanceSchema = new Schema<AttendanceType>({
    sessionId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
        
})
let Attendance : Model<AttendanceType>
try {
    Attendance = mongoose.model<AttendanceType>("attendance")
} catch (error) {
    Attendance = mongoose.model<AttendanceType>('attendance', AttendanceSchema);
}
export {Attendance}
export type {AttendanceType}