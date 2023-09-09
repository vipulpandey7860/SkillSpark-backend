const express = require("express");
const router = express.Router();
const { homepage, studentsignup,
    
    
    studentsignin, studentsignout, currentUser, studentsendmail, studentforgetlink, studentresetpassword,

    studentupdate,studentavatar

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
router.get('/student/forget-link/:id', studentforgetlink )


//POST /student/reset-password/studentid - reset-change password 
router.post('/student/reset-password/:id', isAuthenticated,studentresetpassword )


// POST /student/update/:studentid - update student
router.post('/student/update/:id', isAuthenticated,studentupdate )

// POST /student/avatar/:studentid - update student avatar
router.post('/student/avatar/:id', isAuthenticated,studentavatar )




module.exports = router;