import bcrypt from 'bcrypt';
import { hashPassword } from '$lib/auth';

const generateUserData = async () => {
  const users = [
    {
      firstname: 'Alice',
      lastname: 'Smith',
      userId: 'alice001',
      password: await hashPassword('password123'), 
      attendancecount: 10,
      admin: false,
      email: 'alice.smith@example.com',
    },
    {
      firstname: 'Bob',
      lastname: 'Johnson',
      userId: 'bob002',
      password: await hashPassword('password123'), 
      attendancecount: 15,
      admin: true,
      email: 'bob.johnson@example.com',
    },
  ];

  console.log(JSON.stringify(users, null, 2));
};

generateUserData();
