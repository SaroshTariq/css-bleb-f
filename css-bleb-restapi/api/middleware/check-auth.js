const Database = require('../database/database');
const db = new Database();

module.exports = (req, res, next) => {
    db.execQuery("SELECT * FROM session WHERE ?", req.headers.autherization).then(result => {
        if(result.length>0){
            next();
        }else{
            return res.status(401).json({message: 'Unauthrized.'});
        }
        
    });
}