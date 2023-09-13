const express = require("express");
const router = express.Router();
const {
    homepage,
    employesignup,
    employesignin,
    employesignout,
    currentemploye,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeorganizationlogo,
    employedelete,
    createinternship,
    readinternship,
    readsingleinternship,
    closeinternship,
    createjob,
    readjob,
    readsinglejob,
    closejob


} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET / - get homepage
router.get('/', homepage)

//POST /employe - get current user
router.post('/current',isAuthenticated, currentemploye)


// POST /employe/signup - register
router.post('/signup', employesignup)

// POST /employe/signin - login
router.post('/signin', employesignin)

// GET /employe/signout - logout
router.get('/signout',isAuthenticated, employesignout)

// POST /employe/send-mail - forgot password
router.post('/send-mail', employesendmail)

//GET /employe/forget-link/employe._id - new password 
router.post('/forget-link', employeforgetlink )


//POST /employe/reset-password/employeid - reset-change password 
router.post('/reset-password/:id', isAuthenticated,employeresetpassword )


// POST /employe/update/:employeid - update employe
router.post('/update/:id', isAuthenticated,employeupdate )

// POST /employe/organizationlogo/:employeid - update organizationlogo 
router.post('/organizationlogo/:id', isAuthenticated,employeorganizationlogo )

// POST /employe/delete/:employeid - delete employe 
router.post('/delete/:id', isAuthenticated,employedelete )


// -------------------- internship -----------------------------

// POST /employe/internship/create - create internship
router.post('/internship/create', isAuthenticated,createinternship )

// POST /employe/internship/read - read internship
router.post('/internship/read', isAuthenticated,readinternship )

// POST /employe/internship/read/:internshipid - read single internship
router.post('/internship/read/:id', isAuthenticated, readsingleinternship)

// POST /employe/internship/close/:internshipid - close single internship
router.post('/internship/close/:id', isAuthenticated,closeinternship )


// -------------------- Jobs -----------------------------

// POST /employe/job/create - create job
router.post('/job/create', isAuthenticated,createjob )

// POST /employe/job/read - read job
router.post('/job/read', isAuthenticated,readjob )

// POST /employe/job/read/:id - read single job
router.post('/job/read/:id', isAuthenticated,readsinglejob )

// POST /employe/job/close/:jobid - close single job
router.post('/job/close/:id', isAuthenticated,closejob )

module.exports = router;