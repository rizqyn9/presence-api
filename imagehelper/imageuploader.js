const multer = require('multer');
const path = require('path');


//storage setting
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

//file filter image

const filterfile = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('Unsupported files'), false);
    }
};

const upload = multer({
    storage : storage, limits:{
        fileSize:1024*1024*10
    },
    fileFilter:filterfile
});

module.exports = {upload: upload}