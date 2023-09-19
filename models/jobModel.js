const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({

    employe: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employe"
        }
    ,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    status: {
        type: String,
        enum: {
            values: [
                'Open',
                'Closed'
            ],  
        },
        default: 'Open'
    },
    title: {
        type: String,
        required: [true, "Please enter job profile"],
        trim: true,
        maxlength: [50, "job profile cannot exceed 50 characters"]
    },
    skills: {
        type: String,
        required: [true, "Please enter skills"],
        trim: true,
        maxlength: [500, "Skills cannot exceed 500 characters"]
    },
    jobtype: {
        type: String,
        enum: {
            values: [
                'In office',
                'Remote'
            ],
        },
        required: [true, "Please enter job type"],
        trim: true,
        maxlength: [20, "job type cannot exceed 20 characters"]
    },
    
    openings: {
        type: String,
        required: [true, "Please enter job openings"],
        trim: true,
        maxlength: [10, "job openings cannot exceed 10 characters"]
    },
    salary: {
        type: Number,
        required: [true, "Please enter salary amount"],
        trim: true,
        maxlength: [15, "Salary amount cannot exceed 15 characters"]
    },
    perks: {
        type: String,
        required: [true, "Please enter job perks"],
        trim: true,
        maxlength: [500, "job perks cannot exceed 500 characters"]
    },
    assesments: {
        type: String,
        required: [true, "Please enter job assements"],
        trim: true,
        maxlength: [500, "job assements cannot exceed 500 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter job description"],
        trim: true,
        maxlength: [500, "job description cannot exceed 500 characters"]
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
