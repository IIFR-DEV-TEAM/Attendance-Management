import mongoose, {Schema,Document} from 'mongoose';

interface UserType extends Document {
    firstname:string,
    lastname:string,
    userId:string,
    password:string,
    attendancecount:number,
    admin:boolean,
    email:string
}

const userSchema = new Schema({
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

const User =  mongoose.models.User<UserType> || mongoose.model<UserType>('User', userSchema);
export type {UserType}
export default User;
