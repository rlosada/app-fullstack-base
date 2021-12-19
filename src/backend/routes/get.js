/*------------------------------------------------------------------*
 * get.js															*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa procesamiento de los GET                              *
 *------------------------------------------------------------------*/

 // Funciones exportadas 
 module.exports = {getAllDevices}

 const dbconnection   = require('../mysql-connector');         // Manipular conexion a base de datos
 const { StatusCode } = require('status-code-enum');           // Incorpora constantes con los codigos HTTP 
 const logger         = require('../logger');                  // Incorpora logger
 
//=======[ API ]==================================================

/*------------------------------------------------------------------*
 * getAllDevices(req, res)									        *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera todos los dispositivos existentes. Incluye informacion  *
 * basica de cada dispositivo asi como tambien sus controles aso-   *
 * ciados.                                                          *
 *------------------------------------------------------------------*/

 function getAllDevices(req, res) 
 {
    const f =  getAllDevices.name;
    const id = req.params.devid;

    if(id === undefined)  
        logger(f, `Procesing GET Request for all devices`);
    else
        logger(f, `Procesing GET Request for device with id = ${id}`); 
 
    _getAllDevices(id, (err, devices) => 
        {
            if(err) {
                res.status(StatusCode.ServerErrorInternal).send();
                return;
            }
            res.status(StatusCode.SuccessOK);
            res.send(JSON.stringify(devices));
            return;
        }
    )
  }

  //=======[ Internal ]==================================================
  
  /*-----------------------------------------------------------------*
  * _getAllDevices(id, cbck)									     *
  *																	 *
  * Entrada:		id        Identificador del dispositivo          *
  *                 cbck      Funcion de callback a quien pasar los  *
  *                           resultados.                            *
  *																	 *
  * Salida:		    res       Response HTTP                          *
  *																	 *
  * Retorno:	    No posee                                         *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Recupera el/los dispositivo/s solicitado/s.                      *
  *------------------------------------------------------------------*/
function _getAllDevices(id, cbck)
{   
    const f = _getAllDevices.name;
    let v = [];
    let query; 

    if(id === undefined) {
        logger(f, `Loading all devices from database`);
        query = 'SELECT * FROM Devices';            
    }
    else {
        logger(f, `Loading device with id=${id}`);
        query = 'SELECT * FROM Devices WHERE id = ?';
        v.push(id);            
    }

    dbconnection.query(query, id, (err, result) => 
        {
            // Si hay error en la consulta
            if(err) {
                logger(f, `Loading device[s] from dB failed. Error_code: ${err.code}, query:${err.sql}`);
                return cbck(new Error(`Error quering database: error_code: ${err.code}, query:${err.sql}`), id)
            }
            logger(f, `Loading device[s] succedded.`);
            return cbck(null, result);
        }
    )    
}

 
 
  
 
 









 /*------------------------------------------------------------------*
 * processResponse(err, result, res)								*
 *																	*
 * Entrada:		err        Error si hubiera                         *
 *              resultado  Resultado si hubiera                     *
 *              res        Response HTTP                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Envia al remoto el resultado de la peticion                      *
 *------------------------------------------------------------------*/

 function processResponse(err, result, res)
 {
     // Si hay error, procesarlo
     if(err) {
        logger(processResponse.name, err.message); 
         res.status(StatusCode.ServerErrorInternal);
         res.send();
         return;
     }
     // Si no hay error devolver el resultado
     res.status(StatusCode.SuccessOK);
     res.send(JSON.stringify(result));
 }
