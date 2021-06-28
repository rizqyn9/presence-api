var express = require('express');
var auth = require('./auth');
var router = express.Router();
const imageupload = require('../imagehelper/imageuploader');
const verification = require('./verifikasi');

//registrasi
router.post('/api/v1/register', imageupload.upload.single('image'), auth.registrasi);

//login
router.post('/api/v1/login', auth.login);

//passchange
router.put('/api/v1/updatepass', verification(), auth.passchange);

//testing verifikasi
router.get('/api/v1/rahasia', verification(), auth.halamanrahasia);

module.exports = router;