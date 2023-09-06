const express = require("express");
const router = express.Router();
const { 
    resume, addeducation,
    editeducation,deleteeducation,addjob,
    editjob,
    deletejob,
    addintern,
    editintern,
    deleteintern,
    addresp,
    editresp,
    deleteresp,
    addcours,
    editcours,
    deletecours,
    addproj,
    editproj,
    deleteproj,
    addskil,
    editskil,
    deleteskil,
    addacomp,
    editacomp,
    deleteacomp,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");


// --------------------------Education-------------------

//GET /resume - get resume
router.get('/', isAuthenticated, resume)

//POST /add-edu - add education
router.post('/add-edu', isAuthenticated, addeducation)

//POST /edit-edu - add education
router.post('/edit-edu/:eduid', isAuthenticated, editeducation)

//POST /delete-edu - delete education
router.post('/delete-edu/:eduid', isAuthenticated, deleteeducation)


// --------------------------Job-------------------

// POST /add-job - add job
router.post("/add-job", isAuthenticated, addjob);

// POST /edit-job - edit job
router.post("/edit-job/:jobid", isAuthenticated, editjob);

// POST /delete-job - delete job
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

// ----------------------------Internships--------------------

// POST /add-intern - add intern
router.post("/add-intern", isAuthenticated, addintern);

// POST /edit-intern - edit intern
router.post("/edit-intern/:internid", isAuthenticated, editintern);

// POST /delete-intern - delete intern
router.post("/delete-intern/:internid", isAuthenticated, deleteintern);

// ----------------------------Responsibilities--------------------

// POST /add-resp - add resp
router.post("/add-resp", isAuthenticated, addresp);

// POST /edit-resp - edit resp
router.post("/edit-resp/:respid", isAuthenticated, editresp);

// POST /delete-resp - delete resp
router.post("/delete-resp/:respid", isAuthenticated, deleteresp);

// ----------------------------Courses--------------------

// POST /add-cours - add cours
router.post("/add-cours", isAuthenticated, addcours);

// POST /edit-cours - edit cours
router.post("/edit-cours/:coursid", isAuthenticated, editcours);

// POST /delete-cours - delete cours
router.post("/delete-cours/:coursid", isAuthenticated, deletecours);

// ----------------------------projects--------------------

// POST /add-proj - add proj
router.post("/add-proj", isAuthenticated, addproj);

// POST /edit-proj - edit proj
router.post("/edit-proj/:projid", isAuthenticated, editproj);

// POST /delete-proj - delete proj
router.post("/delete-proj/:projid", isAuthenticated, deleteproj);

// ----------------------------skills--------------------

// POST /add-skil - add skil
router.post("/add-skil", isAuthenticated, addskil);

// POST /edit-skil - edit skil
router.post("/edit-skil/:skilid", isAuthenticated, editskil);

// POST /delete-skil - delete skil
router.post("/delete-skil/:skilid", isAuthenticated, deleteskil);

// ----------------------------accomplishments--------------------

// POST /add-acomp - add acomp
router.post("/add-acomp", isAuthenticated, addacomp);

// POST /edit-acomp - edit acomp
router.post("/edit-acomp/:acompid", isAuthenticated, editacomp);

// POST /delete-acomp - delete acomp
router.post("/delete-acomp/:acompid", isAuthenticated, deleteacomp);


module.exports = router;