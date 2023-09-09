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
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob


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
router.get('/forget-link/:id', employeforgetlink )


//POST /employe/reset-password/employeid - reset-change password 
router.post('/reset-password/:id', isAuthenticated,employeresetpassword )


// POST /employe/update/:employeid - update employe
router.post('/update/:id', isAuthenticated,employeupdate )

// POST /employe/organizationlogo/:employeid - update organizationlogo 
router.post('/organizationlogo/:id', isAuthenticated,employeorganizationlogo )


// -------------------- internship -----------------------------

// POST /employe/internship/create - create internship
router.post('/internship/create', isAuthenticated,createinternship )

// POST /employe/internship/read - read internship
router.post('/internship/read', isAuthenticated,readinternship )

// POST /employe/internship/read/:id - read single internship
router.post('/internship/read/:id', isAuthenticated,readsingleinternship )


// -------------------- Jobs -----------------------------

// POST /employe/job/create - create job
router.post('/job/create', isAuthenticated,createjob )

// POST /employe/job/read - read job
router.post('/job/read', isAuthenticated,readjob )

// POST /employe/job/read/:id - read single job
router.post('/job/read/:id', isAuthenticated,readsinglejob )



module.exports = router;