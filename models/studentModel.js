const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const studentModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true,
        maxlength: [50, "Your first name cannot exceed 50 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true,
        maxlength: [50, "Your last name cannot exceed 50 characters"]
    },
    avatar: {
        type: Object,
        default: {
            fileId: "",
            url: "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg",
        },
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
                
    },
    email: {
        type: String, 
        required: [true, "Please enter your email"],
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    contact: {
        type: String,
        required: [true, "Please enter your contact number"],
        trim: true,
        unique: true,
        minlength: [10, "Your phone number must be atleast 10 characters"],
        maxlength: [10, "Your phone number cannot exceed 10 characters"],
    },
    city: {
        type: String,
        required: [true, "Please enter your city"],
        trim: true,
        maxlength: [50, "Your city cannot exceed 50 characters"]
    },
    address: {
        type: String,
        required: [true, "Please enter your address"],
        trim: true,
        maxlength: [500, "Your address cannot exceed 500 characters"]
    },
    aboutme: {
        type: String,
        trim: true,
        maxlength: [500, "Your about me cannot exceed 500 characters"]
    },



    resume: {
        education: [],
        jobs: [],
        internships: [],
        courses: [],
        projects: [],
        skills: [],
        accomplishments: [],
    },

    internships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship"
        }
    ],
   
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],

    password: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true,
        select: false,
        minlength: [6, "Your password must be longer than 6 characters"],
        maxlength: [12, "Your password cannot exceed 12 characters"],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, 'Please fill a valid password']
    },
    resetPasswordToken: {
        type: String,
        default: "0"
    },

},
    {
        timestamps: true
    }
)

studentModel.pre('save', function () {

    if (!this.isModified('password')) return;
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);

}


studentModel.methods.getjwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}

const Student = mongoose.model("Student", studentModel);

module.exports = Student;
