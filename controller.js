'use strict';

var response = require('./res');
var connection = require('./connection');
const conn = require('./connection');
var mysql = require('mysql');
const { query, format } = require('./connection');
const e = require('express');

//indexing
exports.index = function (req, res){
    response.ok("Welcome", res);
}

//get all track ===> Final
exports.trackrec = function (req, res){
    let search = {
        id_user : req.params.id_user,
        date_one : req.params.date_one,
        date_two : req.params.date_two
    };

    var query = "SELECT DATEDIFF(?, ?) AS dayDiff";
    var input = [search.date_one, search.date_two];

    query = mysql.format(query,input);
    
    connection.query(query, function(error,rows){
        if (error){
            console.log(error)
            res.status(400).json({Status : "Error", "Message" : "Something is wrong"});
        }else{
            if(rows[0].dayDiff <= 0 || rows[0].dayDiff > 90){
                res.status(404).json({Status : "Error", "Message" : "Please check the input"});
            }else{
                var total = rows[0].dayDiff;
                var query = "SELECT trackrec.id_post, trackrec.date, trackrec.location FROM ?? WHERE ?? = ? AND ?? BETWEEN ? AND ?";
                var table = ["trackrec", "id_user", search.id_user, "date", search.date_two, search.date_one]

                query = mysql.format(query, table);
                connection.query(query, function(error, rows){
                    if(error){
                        console.log(error);
                        res.status(400).json({Status : "Error", "Message" : "Bad Request"});
                    }else{
                        res.status(200).json({Status :"Success", Total : total, Trackrecord : rows});
                    }
                })
            }
        }
    })
}

//get single track ===> Final
exports.detailrec = function(req,res){
    let detail = {
        date : req.params.date,
        id_user : req.params.id_user
    };

    var query = "SELECT * FROM trackrec WHERE ?? = ? AND ?? = ?";
    var input = ["date", detail.date, "id_user", detail.id_user];

    query = mysql.format(query,input);
    
    connection.query(query, function(error, rows){
        if(rows.length > 0){
             res.json({Success : "true", detail : rows[0]});
        }else{
            res.status(404).json({"Error" : true, "Massage" : "Something went wrong!"});
        }
    })
}

//edit post in single track ===> Final
exports.editact = function(req, res){
    var edit= {
        date : req.body.date,
        post : req.body.post,
        id_user : req.body.id_user
    };

    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
    var table = ["trackrec", "post", edit.post, "date", edit.date, "id_user", edit.id_user];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
            res.status(400).json({Error : "Yes", "Message" : "Your activity can't be updated!"});
        }else{
            res.status(200).json({Success : "true", "Message" : "Your activity has been updated."});
        }
    })
}

//post presence ===> Final
exports.postpresence = function(req, res){
    var presence={
        post : req.body.post,
        date : req.body.date,
        arrivetime : req.body.arrivetime,
        leavingtime : req.body.leavingtime,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        location : req.body.location,
        id_user : req.body.id_user
    };

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var table = ["trackrec", "date", presence.date, "id_user", presence.id_user];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
            res.status(404).json({Error : "True", "Message" : "Data is not exist"});
        }else{
            if(rows.length == 0){
            
                var query = "INSERT INTO ?? SET ?";
                var table = ["trackrec"];
            
                query = mysql.format(query, table);

                connection.query(query, presence, function(error, rows){
                    if(error){
                        console.log(error);
                        res.status(400).json({Error : "True", "Message" : "Bad input"});
                    }else{
                        response.ok("Presence has been made", res)
                    }
                });
            }else{
                res.status(400).json({Error : "True", "Message" : "Date already exist"});
            }
        }
    })
}

//post absence ===> Final
exports.postabsence = function(req, res){
    var update = {
        leavingtime : req.body.leavingtime,
        date : req.body.date,
        id_user : req.body.id_user
    };

    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
    var table = ["trackrec", "leavingtime", update.leavingtime, "date", update.date, "id_user", update.id_user];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
            res.status(400).json({Error : "Yes", "Message" : "something is wrong"});
        }else{
            res.status(200).json({Success : "true", "Message" : "Your absence has been saved."});
        }
    })
}

//get location ===> Final
exports.getlocation = function(req,res){

    let id_location = req.params.id_location;

    var query = "SELECT * FROM place_location WHERE ?? = ?";
    var table = ["id_location", id_location];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
            res.status(404).json({Error : "True", "Message" : "Location is not found"});
        }else{
            res.status(200).json({Success : "True", location : rows});
        }
         
    })
}