/*------------------------------------------------------------------*
 * post.js															*
 *																	*
 * Historico:	08/12/2021	Primer version							*
 *																	*
 * Implementa procesamiento de los POST                             *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {postDevice}

  const dbconnection            = require('../mysql-connector');  // Manipular conexion a base de datos
  const { StatusCode }          = require('status-code-enum');    // Incorpora constantes con los codigos HTTP 
  const logger                  = require('../logger');           // Incorpora logger
  const { checkHdrAttribute, ATTR_DEVICE, ATTR_ID_NAME, ATTR_TYPE_NAME, checkDeviceType }   = require('../common');           // Incorpora funcion para chequear atributos del request HTTP
  
  //=======[ API ]==================================================
  
  /*------------------------------------------------------------------*
   * postDevice(req, res)									            *
   *																	*
   * Entrada:		req         Request HTTP                            *
   *																	*
   * Salida:		res         Response HTTP                           *
   *																	*
   * Retorno:	    No posee                                            *
   *																	*
   * Descripcion:														*
   *																	*
   * Crea un nuevo dispositivo.                                       *
   *------------------------------------------------------------------*/
   function postDevice(req, res) 
   {
       let err;
  
       logger(postDevice.name, `Processing POST Request with body: ${JSON.stringify(req.body)}`);
       
       // Verificar que la request es valida
       err = checkPostRequest(req);
       if(err) 
          return res.status(StatusCode.ClientErrorBadRequest).send();
  
       // Insertar el objeto en la base
       addDevice(req.body, (err, id) => 
          {
              if(err) {
                  logger(postDevice.name, `Error when inserting new device on db, executing ROLLBACK, ${err}`);
                  res.status(StatusCode.ServerErrorInternal).send();
                  return;
              }
              logger(postDevice.name, `New device inserted successfully on db, executing COMMIT to save changes`);
              res.status(StatusCode.SuccessOK);
              res.send({ id : id});
              return;
          } 
      );
    }
  
    //=======[ Internal ]==================================================
  
    
 /*----------------------------------------------------------------*
 * checkPostRequest(res)								            *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    Error o null si todo fue bien                       *
 *																	*
 * Descripcion:														*
 *																	*
 * Verifica que la request este formada correctamente.              *
 *------------------------------------------------------------------*/
  function checkPostRequest(req) 
  {
    let f = checkPostRequest.name;
    let err;
    let header = req.headers;
    let headerList = 
    [
        { 'key' : 'content-type' , 'value' : 'application/json'}
    ]

    // Verificar los headers
    logger(f, `Checking HTTP Header attributes`);
    for(let i = 0; i < headerList.length; i++) {
        err = checkHdrAttribute(header, headerList[0].key, headerList[0].value);
        if(err) {
            logger(f, `Invalid HTTP Header attributes`);
            return err;
        }
    }
    // Verificar que posea un body
    logger(f, `Checking if Body is valid`);
    if(req.body == undefined) {
        let m = 'Body is not present';
        logger(f, m);
        return new Error(m);
    }
    // Verificar el body
    for(let i = 0; i < ATTR_DEVICE.length; i++) {
        // el ID se ignora
        if(ATTR_DEVICE[i].name === ATTR_ID_NAME)
            continue;
        let v = req.body[ATTR_DEVICE[i].name]; // Valor del atributo
        let t = ATTR_DEVICE[i].type; // Tipo de atributo
        if( v === undefined || typeof v !== t ) {
            let m = `Body is not valid. Attribute '${ATTR_DEVICE[i].name}' not found or with type differente from expected (${ATTR_DEVICE[i].type})`;
            logger(f, m);
            return new Error(m);          
        }
        if(ATTR_DEVICE[i].name === ATTR_TYPE_NAME && checkDeviceType(v) === false) {
            let m = `Body is not valid. Attribute '${ATTR_TYPE_NAME}' value ${v} is not valid`;
            logger(f, m);
            return new Error(m);  
        }
    }

    return null;
  }

  /*------------------------------------------------------------------*
 * addDevice(device, cbck)								            *
 *																	*
 * Entrada:	   device     	Dispositivo a agregar                   *
 *             cbck         Funcion de callback a quien pasar los   *
 *                          resultados.                             *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Inserta un nuevo dispositivo en la tabla Devices                 *
 *------------------------------------------------------------------*/
 function addDevice(device, cbck)
 {
     let f = addDevice.name;
    const query = 'INSERT INTO `Devices` (name, description, state, type) VALUES (?, ?, ?, ?)';
 
    dbconnection.query(query, [device.name, device.description, device.state, device.type], (err, r) => 
        {
            // Si hay error durante la inserccion, rollback y terminar
            if(err) {
                logger(f, `Adding new device failed`);
                return cbck(new Error(`Error modyfing database: error_code: ${err.code}, query:${err.sql}`));
            }
            logger(f, `Adding new device succedded, id assigned on dB is ${r.insertId}`);
            return cbck(null, r.insertId);
        }
    )
 }

 