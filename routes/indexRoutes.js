const express = require("express");
const router = express.Router();
const {
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentUser,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
    deletestudent,
    studentalljobs,
    studentallinternships,
    studentallcontent

} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");


// GET / - get homepage
router.get('/', homepage)

//POST /student - get current user
router.post('/student',isAuthenticated, currentUser)


// POST /student/signup - register
router.post('/student/signup', studentsignup)

// POST /student/signin - login
router.post('/student/signin', studentsignin)

// GET /student/signout - logout
router.get('/student/signout',isAuthenticated, studentsignout)

// POST /student/send-mail - forgot password
router.post('/student/send-mail', studentsendmail)

//GET /student/forget-link/student._id - new password 
router.post('/student/forget-link', studentforgetlink )


//POST /student/reset-password/studentid - reset-change password 
router.post('/student/reset-password/:id', isAuthenticated,studentresetpassword )


// POST /student/update/:studentid - update student
router.post('/student/update/:id', isAuthenticated,studentupdate )

// POST /student/avatar/:studentid - update student avatar
router.post('/student/avatar/:id', isAuthenticated, studentavatar)

// POST /student/delete/:studentid - delete student 
router.post('/student/delete/:id', isAuthenticated, deletestudent)



// --------------------------- read all internships ----------------------------

// POST /student/internships - get all internships
router.post('/student/internships', isAuthenticated, studentallinternships)

// --------------------------- read all jobs ----------------------------


// POST /student/jobs - get all jobs
router.post('/student/jobs', isAuthenticated, studentalljobs)


// --------------------------- student all content ----------------------------

// POST /student/allcontent/:category - get all jobs & internships
router.post('/student/content/:category', isAuthenticated, studentallcontent)

// --------------------------- apply to internship ----------------------------

// POST /student/apply/internship/:internship_id - apply to internship
router.post('/student/apply/internship/:internshipid', isAuthenticated,applyinternship )


// --------------------------- apply to job ----------------------------

// POST /student/apply/job/:job_id - apply to job
router.post('/student/apply/job/:jobid', isAuthenticated,applyjob )




module.exports = router;