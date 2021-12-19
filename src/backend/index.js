//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
const deleteRoutes   = require('./routes/delete');
const getRoutes    = require('./routes/get');
const postRoutes    = require('./routes/post');
const patchRoutes    = require('./routes/patch')
const logger         = require('./logger');          // Incorpora logger

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.delete('/devices/:devid', deleteRoutes.deleteDevice);
app.get('/devices/:devid', getRoutes.getAllDevices);
app.get('/devices/', getRoutes.getAllDevices);
app.post('/devices/', postRoutes.postDevice);
app.patch('/devices/:devid', patchRoutes.patchDevice);

app.listen(PORT, (req, res) => {
    logger('' , "NodeJS API running correctly");
});

//=======[ End of file ]=======================================================

;