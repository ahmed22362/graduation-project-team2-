const connection = require("../db/connection");
const pool=require("../db/pool");

exports.sendMassege = async (req, res) => {
    try {
        const {senderId, receiverId, messageText} = req.body;
        const createdAt = new Date();
        const query = 'INSERT INTO messages (sender_id, receiver_id, message_text, created_at) VALUES ($1, $2, $3, $4)';
        const values = [senderId, receiverId, messageText, createdAt];
        connection.dbQuery(query, values);
        res.status(200).send('Message sent successfully');
    }catch (error){
        console.error(error);
        res.status(500).send('Error sending message');
    }
}
//
// (error, result) => {
//     if (error) {
//         console.error(error);
//         res.status(500).send('Error sending message');
//     } else {
//         res.status(200).send('Message sent successfully');
//     }