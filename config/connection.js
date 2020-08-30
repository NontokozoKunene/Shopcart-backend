const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');

const db = mysql.createConnection({
    //hosted db
    host: 'bcqucwp84utq2e8hjms2-mysql.services.clever-cloud.com',
    user: 'uoq9jxgrude43llg',
    password: '5d2iERuluqKa5rQ64lU7',
    database: 'bcqucwp84utq2e8hjms2'

    //hosted db
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'ems_db'
});

db.connect(function(error,res){
    if (!!error) {
        // console.log(error);
       res.json({
           code : 100,
           status : "Error in connection database: " + error
        });
		// return;
    } else {
        console.log('Connected to the database');
        // res.json({
        //     code : 200, 
        //     status : "Connected to the database:"
        //  });
    }
});


module.exports=db;