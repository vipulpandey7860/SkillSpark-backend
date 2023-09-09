const { catchAsyncErrors } = require('../middlewares/catchAsyncError');
const Employe = require('../models/employeModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendtoken } = require('../utils/SendToken');
const { sendmail } = require('../utils/nodemailer');
const imagekit = require('../utils/imageKit').initImageKit();
const path = require('path');

exports.homepage = catchAsyncErrors(async (req, res, next) => {

    res.json("Secure Employee homapage ");
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json(employe);
});


exports.employesignup = catchAsyncErrors(async (req, res, next) => {

    const employe = await new Employe(req.body).save();

    sendtoken(employe, 201, res);

    // res.status(201).json(employe);
});


exports.employesignin = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();

    if (!employe) return next(new ErrorHandler("Invalid Email", 404));


    const isMatch = employe.comparePassword(req.body.password);


    if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));
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

    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;


    sendmail(req, res, next, url);
    employe.resetPasswordToken = "1";
    await employe.save();

    res.json({ employe, url });

});


exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findById(req.params.id).exec();


    if (!employe) return next(new ErrorHandler("Email not found", 404));

    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0"
        employe.password = req.body.password;
    } else {
        return next(new ErrorHandler("Link expired, Request a new Link", 404));
    }
    await employe.save();
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
