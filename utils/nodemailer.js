const nodemailer = require("nodemailer");

exports.sendmail = (req,res,next,url) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "vipul pvt ltd ",
        to: req.body.email,
        subject: "password reset link",
        // text: "click on the link to reset your password",
        html: `<h1>click on the link to reset your password</h1> 
        <a href="${url}">click here</a>
        
        opt is ${url}
        `,
    };

    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            return next(new ErrorHandler(err, 500));
        } 
        console.log(info)
        return res.status(200).json({
            message: "Email sent successfully",
            url: url,
            
        });
    });
};