const jwt = require ('jsonwebtoken');
const config = require ('../config/secret');

function verification () {
    return function (req, rest, next){

        var tokenwithbearer = req.headers.authorization;
        if(tokenwithbearer){

            //proses pemisahan menggunakan split
            var token = tokenwithbearer.split(' ')[1];

            //proses utama verifikasi
            jwt.verify(token, config.secret, function(err,decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:"Token tidak terdaftar!"});
                }else{
                    if(decoded.rows[0].role == "Staff" || decoded.rows[0].role == "Magang" ){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:"gagal melakukan otorisasi!"});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:"Token tidak tersedia!"});
        }

    }
}

module.exports = verification;