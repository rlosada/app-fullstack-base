/*------------------------------------------------------------------*
 * patch.js															*
 *																	*
 * Historico:	08/12/2021	Primer version							*
 *																	*
 * Implementa procesamiento de los POST                             *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {patchDevice}

  const dbconnection            = require('../mysql-connector');  // Manipular conexion a base de datos
  const { StatusCode }          = require('status-code-enum');    // Incorpora constantes con los codigos HTTP 
  const logger                  = require('../logger');           // Incorpora logger
  const { checkHdrAttribute, ATTR_DEVICE, ATTR_ID_NAME, ATTR_TYPE_NAME, checkDeviceType}   = require('../common');           // Incorpora funcion para chequear atributos del request HTTP
  
  //=======[ API ]==================================================
  
  /*------------------------------------------------------------------*
   * patchDevice(req, res)									            *
   *																	*
   * Entrada:		req         Request HTTP                            *
   *																	*
   * Salida:		res         Response HTTP                           *
   *																	*
   * Retorno:	    No posee                                            *
   *																	*
   * Descripcion:														*
   *																	*
   * Actualiza un dispositivo existente.                                *
   *------------------------------------------------------------------*/
   function patchDevice(req, res) 
   {
       let err;
  
       logger(patchDevice.name, `Processing PATCH Request with body: ${JSON.stringify(req.body)}`);
       
       // Verificar que la request es valida
       err = checkPatchRequest(req);
       if(err) 
          return res.status(StatusCode.ClientErrorBadRequest).send();
  
       // Insertar el objeto en la base
       updateDevice(req.params.devid, req.body, (err, id) => 
          {
              if(err) {
                  logger(patchDevice.name, `error when updating device on db, ${err}`);
                  res.status(StatusCode.ServerErrorInternal).send();
                  return;
              }
              logger(patchDevice.name, `device updated successfully on db`);
              res.status(StatusCode.SuccessOK);
              res.send({ id : req.params.devid});
              return;
          } 
      );
    }
  
    //=======[ Internal ]==================================================
  
    
 /*----------------------------------------------------------------*
 * checkPatchRequest(res)								            *
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
  function checkPatchRequest(req) 
  {
    let f = checkPatchRequest.name;
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
    let n     = 0;
    for(let i = 0; i < ATTR_DEVICE.length; i++) {
        let v = req.body[ATTR_DEVICE[i].name]; // Valor del atributo
        let t = ATTR_DEVICE[i].type; // Tipo de atributo
        // Si el atributo esta o bien es 'type', ignorar
        if(v === undefined /*|| ATTR_TYPE_NAME === ATTR_DEVICE[i].name*/)
            continue;
        // Si el atributo es del tipo incorrecto, rechazar
        if(typeof v !== t) {
            let m = `Body is not valid. Attribute '${ATTR_DEVICE[i].name}' with type differente from expected (${ATTR_DEVICE[i].type})`;
            logger(f, m);
            return new Error(m);          
        }
        // Incrementar la cuenta de atributos 
        n++;
    }
    if(n === 0) {
        let m = `Body is not valid. No attributes to update`;
        logger(f, m);
        return new Error(m);        
    }
 
    return null;
  }

  /*------------------------------------------------------------------*
 * updateDevice(deviceid, device, cbck)								*
 *																	*
 * Entrada:	   deviceid     Identificador del dispositivo           *
 *             device     	Dispositivo a agregar                   *
 *             cbck         Funcion de callback a quien pasar los   *
 *                          resultados.                             *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Actualiza un dispositivo en la tabla Devices                     *
 *------------------------------------------------------------------*/
 function updateDevice(deviceid, device, cbck)
 {
    let f       = updateDevice.name;
    let query = 'UPDATE Devices SET ';
    let first   = true;
    let values  = [];

    for(let i = 0; i < ATTR_DEVICE.length; i++) { 
        let n = ATTR_DEVICE[i].name;
        let v = device[n];
        if(v !== undefined) {
            if(first === true) {
                first = false;
            } 
            else {
                query += ',';
            }
            query += `${n} = ?`;
            values.push(v);
        }
    }
    query += ' WHERE id = ?';
    values.push(deviceid);
 
    dbconnection.query(query, values, (err, r) => 
        {
            // Si hay error durante la inserccion, rollback y terminar
            if(err) {
                logger(f, `Updating device failed`);
                return cbck(new Error(`Error modyfing database: error_code: ${err.code}, query:${err.sql}`));
            }
            logger(f, `Updating device succedded`);
            return cbck(null);
        }
    )
 }

 
 