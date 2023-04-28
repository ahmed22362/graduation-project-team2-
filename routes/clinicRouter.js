var express =require ('express');
const router = express.Router();
var clinicControler = require('../controlers/clinicControler');

router.get("/get_clinics",clinicControler.getClinicList);
router.post("/add_clinic",clinicControler.addClinic);
router.put("/update_clinic",clinicControler.updateClinic);
router.delete("/delete_clinic",clinicControler.deleteClinic);

module.exports = router