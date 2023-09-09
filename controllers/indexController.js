const { catchAsyncErrors } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const Internship = require('../models/internshipModel');
const Job = require('../models/jobModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendtoken } = require('../utils/SendToken');
const { sendmail } = require('../utils/nodemailer');
const imagekit = require('../utils/imageKit').initImageKit();
const path = require('path');

exports.homepage = catchAsyncErrors(async (req, res, next) => {

    res.json("Secure homapage ");
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json(student);
});


exports.studentsignup = catchAsyncErrors(async (req, res, next) => {

    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
    res.status(201).json(student);
});


exports.studentsignin = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
    if (!student) return next(new ErrorHandler("Invalid Email", 404));
    const isMatch = student.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));
    sendtoken(student, 201, res)

});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({
        message: "Logged out"
    })

});


exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findOne({ email: req.body.email }).exec();
    if (!student) return next(new ErrorHandler("Email not found", 404));
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url });

});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.params.id).exec();
    if (!student) return next(new ErrorHandler("Email not found", 404));
    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0"
        student.password = req.body.password;
    } else {
        return next(new ErrorHandler("Link expired, Request a new Link", 404));
    }
    await student.save();
    res.status(200).json({ message: "Password reset successfully" });

});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.params.id).exec();
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res)

    // res.status(200).json({ message: "Password reset successfully" });
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
   
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
    if (!student) return next(new ErrorHandler("Student not found", 404));
    res.status(200).json({ message: "Student updated successfully" });
});



exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
 
    const student = await Student.findById(req.params.id).exec();
    if (!student) return next(new ErrorHandler("Student not found", 404));
    const file = req.files.avatar;
    const modifiedFileName = `student-${student._id}-${Date.now()}${path.extname(file.name)}`;
    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    }
    const {fileId,url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    student.avatar = {
       fileId,url
    };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Avatar updated successfully"
    });

});


// --------------------------- apply to internship ----------------------------

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();
    
    if (!student) return next(new ErrorHandler("Student not found", 404));
    if (!internship) return next(new ErrorHandler("Internship not found", 404));
    
    if (student.internships.includes(internship._id)) {
        return next(new ErrorHandler("Already applied", 404));
    }
    student.internships.push(internship._id);
    internship.students.push(student._id);
    
  

    await student.save();
    await internship.save();
    
    res.json(student);
});

// --------------------------- apply to job ----------------------------

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();
    
    if (!student) return next(new ErrorHandler("Student not found", 404));
    if (!job) return next(new ErrorHandler("Job not found", 404));

    if (student.jobs.includes(job._id)) {
        return next(new ErrorHandler("Already applied", 404));
    }

    student.jobs.push(job._id);
    job.students.push(student._id);
    
    await student.save();
    await job.save();
    
    res.json(student);
});


// ---------------------------  delete student ----------------------------

exports.deletestudent = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.id).exec();
    if (!student) return next(new ErrorHandler("Student not found", 404));
    Internship.updateMany({ students: student._id }, { $pull: { students: student._id } }).exec();
    Job.updateMany({ students: student._id }, { $pull: { students: student._id } }).exec();

    res.json({
        message: "Student deleted successfully"
    });

    
});