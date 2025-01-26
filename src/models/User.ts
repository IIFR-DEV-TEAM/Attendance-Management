import mongoose, {Schema,Document, Model} from 'mongoose';

interface UserType extends Document{
    firstname:string,
    lastname:string,
    userId:string,
    password:string,
    attendancecount:number,
    admin:boolean,
    email:string
}

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendancecount: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  email:{
    type: String,
    default:false
  }
});
let User: Model<UserType>
try {
  User = mongoose.model<UserType>("user")
} catch (error) {
  User = mongoose.model<UserType>("user",UserSchema)
}
export {User}
export type {UserType}

