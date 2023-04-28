var query =require('../db/query');
var conction=require('../db/conction');
const {values} = require("pg/lib/native/query");

exports.getSolidList=async (req, res) => {
    try {
        var solidListQuery = query.queryList.GET_SOLID_LIST_QUARY;
        var result = await conction.dbQuery(solidListQuery);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        return res.status(500).send({error: 'Failed to list solid'});
    }
}

exports.addSolid=async (req, res) => {
    try {
        var solid_id = req.body.solid_id;
        var name = req.body.name;
        var info = req.body.info;
        var solid_imge=req.body.solid_id;
        var price = req.body.price;
        var is_food = req.body.is_food;
        var user_id = req.body.user_id;
        var country = req.body.country;
        var city = req.body.city;

        let values = [solid_id, name, info, solid_imge, price, is_food, user_id, country, city];
        var saveSolidQuary = query.queryList.SAVE_SOLID_QUARY;
        await conction.dbQuery(saveSolidQuary, values);
        return res.status(201).send("Successfully solid created ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error: 'Failed to add solid'});
    }
};

exports.updateSolid=async (req, res) => {
    try {
        var solid_id = req.body.solid_id;
        var name = req.body.name;
        var info = req.body.info;
        var solid_imge=req.body.solid_id;
        var price = req.body.price;
        var is_food = req.body.is_food;
        var user_id = req.body.user_id;
        var country = req.body.country;
        var city = req.body.city;

        let values = [name, info, solid_imge, price, is_food, user_id, country, city , solid_id];
        var updateSolidQuary = query.queryList.UPDATE_SOLID_QUARY;
        await conction.dbQuery(updateSolidQuary, values);
        return res.status(201).send("Successfully solid updated ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error: 'Failed to update solid'});
    }
};
exports.deleteSolid=async (req, res) => {
    try {
        var solid_id = req.body.solid_id;
        if (!solid_id){
            return res.status(500).send({ error: 'can not delete empty solid' })
        }
        var deleteSolidQuary =query.queryList.DELETE_SOLID_QUARY;
        await conction.dbQuery(deleteSolidQuary,[solid_id])
        return res.status(201).send("Successfully solid deleted ")
    }catch (err){
        console.log("Error : " + err);
        return res.status(500).send({error: 'Failed to delete solid'});
    }
};
