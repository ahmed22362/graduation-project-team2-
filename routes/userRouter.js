var express =require ('express');
const router = express.Router();
var userControler = require('../controlers/userControler');
const {auth} = require("../controlers/userControler");

router.get("/get_user",userControler.getUsers);
router.post("/add_user",userControler.addUser);
router.put("/update_user",userControler.updateUser)
router.post("/register",userControler.signUp );



module.exports = router