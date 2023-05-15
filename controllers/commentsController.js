var query = require("../db/query")
var connection = require("../db/connection")

// exports.getComments = async (req, res) => {
//     const pet_id  = req.query.pet_id
//     try {
//         const result = await connection.dbQuery(query.selectAllWhereQuery("comments",`pet_id=${pet_id}`))
//         res.status(200).json({ status: "successful", data: result.rows })
//     } catch (err) {
//         console.log(err.message)
//         res.status(400).send({ error: "Failed to list comments" })
//
//     }
// }
exports.getComments = async (req, res) => {
    try {
        const result = await connection.dbQuery(query.selectAllQuery("comments"))
        res.status(200).json({ status: "successful", data: result.rows })
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ error: "Failed to list comments" })

    }
}

exports.addComment = async (req, res) => {
    try {
        const { text,pet_id,user_id } = req.body
        let values = [text,pet_id,user_id]

        const result = await connection.dbQuery(
            query.queryList.SAVE_COMMENT_QUERY,
            values
        )
        res.status(200).json({ status: "successful", data: result.rows })
    } catch (err) {
        res.status(500).send({ error: `Failed to add comment ${err.message}` })
    }
}

exports.updateComment = async (req, res) => {
    try {
        const {text,id} = req.body

        let values = [text,id]
        if (!(await connection.isExist("comments", req.params.id))) {
            return res
                .status(404)
                .json({ status: "fail", message: "please provide valid id" })
        }
        const result = await connection.dbQuery(
            query.queryList.UPDATE_COMMENT_QUERY,
            values
        )
        res.status(200).json({ status: "successful", data: result.rows })
    } catch (err) {
        res.status(400).send({ error: `Failed to update comment ${err.message}` })
    }
}
exports.deleteComment = async (req, res) => {
    const {id} = req.body
    let values = [id]
    try {
        if (!(await connection.isExist("comments", req.params.id))) {
            return res
                .status(404)
                .json({ status: "fail", message: "please provide valid id" })
        }
        await connection.dbQuery(query.deleteOneQuery("comments", values))
        res.status(201).send("Successfully comment deleted ")
    } catch (err) {
        res.status(400).send({ error: `Failed to delete comment ${err.message}` })
    }
}
