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
    employeorganizationlogo

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


module.exports = router;