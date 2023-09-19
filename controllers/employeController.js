const { catchAsyncErrors } = require('../middlewares/catchAsyncError');
const Employe = require('../models/employeModel');
const Internship = require('../models/internshipModel');
const Job = require('../models/jobModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendtoken } = require('../utils/SendToken');
const { sendmail } = require('../utils/nodemailer');
const imagekit = require('../utils/imagekit').initImageKit();
const path = require('path');

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json("Secure Employee homapage ");
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).populate("jobs").populate("internships").exec();
    res.json(employe);
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {

    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
    // res.status(201).json(employe);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();
    if (!employe) return next(new ErrorHandler("User not found with this Email", 404));
    const isMatch = employe.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Invalid Credientials", 404));
    sendtoken(employe, 201, res)

});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {

    res.clearCookie("token");
    res.json({
        message: "Logged out"
    })
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findOne({ email: req.body.email }).exec();
    if (!employe) return next(new ErrorHandler("Email not found", 404));
    const url = Math.floor(Math.random() * 9000 + 1000);
    sendmail(req, res, next, url);
    employe.resetPasswordToken = `${url}`;
    await employe.save();
    res.json({ employe, url });


});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findOne({ email: req.body.email }).exec();
    if (!employe) return next(new ErrorHandler("Email not found", 404));
    if (employe.resetPasswordToken == req.body.otp) {
        employe.resetPasswordToken = "0"
        employe.password = req.body.password;
    await employe.save();

    } else {
        return next(new ErrorHandler("Link expired, Request a new Link", 404));
    }
    res.status(200).json({ message: "Password reset successfully" });

});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findById(req.params.id).exec();
    employe.password = req.body.password;
    await employe.save();
    sendtoken(employe, 201, res)
    // res.status(200).json({ message: "Password reset successfully" });
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
   
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
    if (!employe) return next(new ErrorHandler("employe not found", 404));
    res.status(200).json({ message: "employe updated successfully" });
});

exports.employeorganizationlogo = catchAsyncErrors(async (req, res, next) => {
 
    const employe = await Employe.findById(req.params.id).exec();
    if (!employe) return next(new ErrorHandler("employe not found", 404));
    const file = req.files.organizationlogo;
    const modifiedFileName = `employe-${employe._id}-${Date.now()}${path.extname(file.name)}`;
    if (employe.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }
    const {fileId,url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });

    employe.organizationlogo = {
       fileId,url
    };

    await employe.save();

    res.status(200).json({
        success: true,
        message: "Organization logo updated successfully"
    });

});

exports.employedelete = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findByIdAndDelete(req.id).exec();
    if (!employe) return next(new ErrorHandler("Employe not found", 404));
    Job.deleteMany({ employe: employe._id }).exec();
    Internship.deleteMany({ employe: employe._id }).exec();
        
    res.json("employe deleted successfully");
});

// -------------------- internship -----------------------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const internship = await new Internship(req.body);
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save();
    await employe.save();
     res.status(201).json({success:true,message:"Internship created successfully","internship":internship});  

});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {

    const {internships} = await Employe.findById(req.id).populate("internships").exec();
    res.status(201).json({success:true,message:"All Internships",internships});  


});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {

    const internship = await Internship.findById(req.params.id).exec();
    if(!internship) return next(new ErrorHandler("Internship not found",404));
    res.status(200).json({success:true,internship});  

});

exports.closeinternship = catchAsyncErrors(async (req, res, next) => {

    const internship = await Internship.findById(req.params.id).exec();
    if (!internship) return next(new ErrorHandler("Internship not found", 404));
    internship.status = "Closed";
    await internship.save();
    res.status(200).json({success:true,message:"Internship closed successfully"});  

});



// -------------------- jobs -----------------------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const job =  new Job(req.body);
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await job.save();
    await employe.save();
     res.status(201).json({success:true,message:"Job created successfully","job":job});  

});

exports.readjob = catchAsyncErrors(async (req, res, next) => {

    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
    res.status(201).json({success:true,message:"All jobs",jobs});  

});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {

    const job = await Job.findById(req.params.id).exec();
    if(!job) return next(new ErrorHandler("Job not found",404));
    res.status(200).json({success:true,job});  

});

exports.closejob = catchAsyncErrors(async (req, res, next) => {

    const job = await Job.findById(req.params.id).exec();
    if (!job) return next(new ErrorHandler("Job not found", 404));
    job.status = "Closed";
    await job.save();
    res.status(200).json({success:true,message:"Job closed successfully"});  

});