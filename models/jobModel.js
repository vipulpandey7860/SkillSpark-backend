const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({

    employe: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employe"
        }
    ,
    student: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    title: {
        type: String,
        required: [true, "Please enter internship profile"],
        trim: true,
        maxlength: [50, "Internship profile cannot exceed 50 characters"]
    },
    skills: {
        type: String,
        required: [true, "Please enter skills"],
        trim: true,
        maxlength: [100, "Skills cannot exceed 100 characters"]
    },
    jobtype: {
        type: String,
        enum: {
            values: [
                'In office',
                'Remote'
            ],
        },
        required: [true, "Please enter internship type"],
        trim: true,
        maxlength: [20, "Internship type cannot exceed 20 characters"]
    },
    
    openings: {
        type: String,
        required: [true, "Please enter internship openings"],
        trim: true,
        maxlength: [10, "Internship openings cannot exceed 10 characters"]
    },
    salary: {
        type: Number,
        required: [true, "Please enter salary amount"],
        trim: true,
        maxlength: [15, "Salary amount cannot exceed 15 characters"]
    },
    perks: {
        type: String,
        required: [true, "Please enter internship perks"],
        trim: true,
        maxlength: [500, "Internship perks cannot exceed 500 characters"]
    },
    assesments: {
        type: String,
        required: [true, "Please enter internship assements"],
        trim: true,
        maxlength: [500, "Internship assements cannot exceed 500 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter internship description"],
        trim: true,
        maxlength: [500, "Internship description cannot exceed 500 characters"]
    },
    preferences: {
        type: String,
        required: [true, "Please enter your preferences"],
        trim: true,
        maxlength: [500, "Job preferences cannot exceed 500 characters"]
    },


    },

    {
        timestamps: true
    }
)



const Job = mongoose.model("Job", jobModel);

module.exports = Job;
