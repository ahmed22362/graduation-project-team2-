var express =require ('express');
const router = express.Router();
var solidControler = require('../controlers/solidControler');

router.get("/get_solids",solidControler.getSolidList);
router.post("/add_solid",solidControler.addSolid);
router.put("/update_solid",solidControler.updateSolid)
router.delete("/delete_solid",solidControler.deleteSolid)

module.exports = router