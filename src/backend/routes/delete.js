/*------------------------------------------------------------------*
 * delete.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa procesamiento de los DELETE                           *
 *------------------------------------------------------------------*/

   // Funciones exportadas 
module.exports = {deleteDevice};

const dbconnection   = require('../mysql-connector'); // Manipular conexion a base de datos
const logger         = require('../logger');          // Incorpora logger
const { StatusCode } = require('status-code-enum');   // Incorpora constantes con los codigos HTTP 

//=======[ API ]==================================================

 /*-----------------------------------------------------------------*
 * deleteDevice(req, res)								            *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Borra el dispositivo solicitado.                                 *
 *------------------------------------------------------------------*/

 function deleteDevice(req, res) 
 {
    const f =  deleteDevice.name;
    const id = req.params.devid;

    logger(f, `Procesing DELETE Request`);

    _deleteDevice(id, (err, deviceid) => 
        {
            if(err) {
                res.status(StatusCode.ServerErrorInternal).send();
                return;
            }
            res.status(StatusCode.SuccessOK);
            res.send( { id : deviceid });
            return;
        }
    )
 }

  /*-----------------------------------------------------------------*
 * _deleteDevice(id, cbck)						                    *
 *																	*
 * Entrada:		id          Identificador del dispositivo           *
 *              cbck        Funcion de callback a quien pasar los   *
 *                          resultados.                             *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Borra las posibles entradas del dispositivo de la tabla Devices  *
 * Luego transfiere el control a cbck().                            *
 *------------------------------------------------------------------*/

function _deleteDevice(id, cbck)
{   
    const f = _deleteDevice.name;

    logger(f, `Deleting from Devices entry for device with id=${id}`);

    dbconnection.query('DELETE FROM Devices WHERE id = ?', id, (err, result) => 
        {
            // Si hay error en la consulta
            if(err) {
                logger(f, `Deleting device with id=${id} from dB failed`);
                return cbck(new Error(`Error quering database: error_code: ${err.code}, query:${err.sql}`), id)
            }
            logger(f, `Deleting from Devices entry for device with id=${id} succedded. Number of rows affected=${result.affectedRows}`);
            return cbck(null, id);
        }
    )    
}
