import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db';
import { BaseUser } from './models/BaseUser';
import { SuperAdmin } from './models/SuperAdmin';
import { SchoolAdmin } from './models/SchoolAdmin';
import { Teacher } from './models/Teacher';
import { Student } from './models/Student';
import School from './models/School';
import Class from './models/Class';

// Load biến môi trường
dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // XÓA DỮ LIỆU CŨ
    await Promise.all([
      BaseUser.deleteMany({}),
      School.deleteMany({}),
      Class.deleteMany({})
    ]);

    console.log('🧹 Old data removed');

    // 1. SUPER ADMIN
    const superAdmin = await SuperAdmin.create({
      fullName: 'Nguyễn Quản Trị',
      email: 'admin@edu.vn',
      username: 'superadmin',
      password: '123456',
      role: 'SuperAdmin',
      isVerified: true
    });

    // 2. SCHOOL
    const school = await School.create({
      name: 'Trường THCS Ngôi Sao',
      code: 'NGOISAO001',
      address: '123 Lê Lợi, Hà Nội',
      level: 'Secondary'
    });

    // 3. SCHOOL ADMIN
    const schoolAdmin = await SchoolAdmin.create({
      fullName: 'Nguyễn Quản Lý',
      email: 'manager@edu.vn',
      username: 'schooladmin',
      password: '123456',
      role: 'SchoolAdmin',
      schoolId: school._id,
      isVerified: true
    });

    school.adminId = schoolAdmin._id;
    await school.save();

    // 4. TEACHER
    const teacher = await Teacher.create({
      fullName: 'Lê Giáo Viên',
      email: 'teacher@edu.vn',
      username: 'teacher1',
      password: '123456',
      role: 'Teacher',
      literacy: 'Thạc sĩ',
      subject: ['Math'],
      isVerified: true
    });

    // 5. CLASS
    const classroom = await Class.create({
      name: '8A1',
      code: '8A1',
      schoolId: school._id,
      teacherId: teacher._id,
      maxStudents: 40,
      students: []
    });

    // 6. STUDENT
    const student = await Student.create({
      fullName: 'Trần Học Sinh',
      email: 'student@edu.vn',
      username: 'student1',
      password: '123456',
      role: 'Student',
      schoolId: school._id,
      classId: classroom._id,
      isVerified: true
    });

    // Gắn học sinh vào lớp
    classroom.students.push(student._id);
    await classroom.save();

    console.log('✅ Seed dữ liệu thành công!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seed thất bại: ${(error as Error).message}`);
    process.exit(1);
  }
};

seedData();
