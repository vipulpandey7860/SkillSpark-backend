const mongoose = require('mongoose');

const internshipModel = new mongoose.Schema({

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
  
    profile: {
        type: String,
        required: [true, "Please enter internship profile"],
        trim: true,
        maxlength: [50, "Internship profile cannot exceed 50 characters"]
    },
    skills: {
        type: String,
        required: [true, "Please enter skills"],
        trim: true,
        maxlength: [500, "Skills cannot exceed 500 characters"]
    },
    internshiptype: {
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
    },
    from: {
        type: Date,
        required: [true, "Please enter internship start date"],
        trim: true,
        maxlength: [20, "Internship start date cannot exceed 20 characters"]
    },
    to: {
        type: Date,
        required: [true, "Please enter internship end date"],
        trim: true,
        maxlength: [20, "Internship end date cannot exceed 20 characters"]
    },
    duration: {
        type: String,
        required: [true, "Please enter internship duration"],
        trim: true,
        maxlength: [20, "Internship duration cannot exceed 20 characters"]
    },
    responsibilities: {
        type: String,
        required: [true, "Please enter internship responsibility"],
        trim: true,
        maxlength: [500, "Internship responsibility cannot exceed 500 characters"]
    },

    stipend: {
        
        amount: {
            type: Number,
            required: [true, "Please enter internship stipend amount"],
            trim: true,
            maxlength: [10, "Internship stipend amount cannot exceed 10 characters"]
        },
        mode: {
            type: String,
            enum: {
                values: [
                    'Paid',
                    'Unpaid',
                    'Fixed',
                    'Performance Based'
                ],
            },
        },
    },
    perks: {
        type: String,
        required: [true, "Please enter internship perks"],
        trim: true,
        maxlength: [500, "Internship perks cannot exceed 500 characters"]
    },
   
    description: {
        type: String,
        required: [true, "Please enter internship description"],
        trim: true,
        maxlength: [500, "Internship description cannot exceed 500 characters"]
    },
    status: {
        type: String,
        enum: {
            values: [
                'Open',
                'Closed'
            ],  
            default: 'Open'
        },

    },
    assesments: {
        type: String,
        required: [true, "Please enter internship assements"],
        trim: true,
        maxlength: [500, "Internship assements cannot exceed 500 characters"]
    },
    
    },

    {
        timestamps: true
    }
)

const Internship = mongoose.model("Internship", internshipModel);

module.exports = Internship;
