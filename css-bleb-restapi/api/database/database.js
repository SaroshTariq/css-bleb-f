const mysql = require('mysql');

module.exports =  class DB{    
    constructor(){
        this.conn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        this.conn.connect(function(err) {
            if (err) throw err;
        });
        
    }

    execQuery(query, args){
        return new Promise( ( resolve, reject ) => {
            this.conn.query( query, args, ( err, result ) => { 
               if ( err )
                    reject( err );
                resolve( result );
            } );
        } );
    }
    
}

