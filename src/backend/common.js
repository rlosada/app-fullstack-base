/*------------------------------------------------------------------*
 * common.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Funciones y elementos comunes                                    *
 *------------------------------------------------------------------*/

const logger = require("./logger");



const ATTR_ID_NAME          = 'id';
const ATTR_ID_TYPE          = 'number';
const ATTR_NAME_NAME        = 'name';
const ATTR_NAME_TYPE        = 'string';
const ATTR_DESCRIPTION_NAME = 'description';
const ATTR_DESCIPTION_TYPE  = 'string';
const ATTR_STATE_NAME       = 'state';
const ATTR_STATE_TYPE       = 'number';
const ATTR_TYPE_NAME        = 'type';
const ATTR_TYPE_TYPE        = 'number';

// Formato de la tabla Devices 
const ATTR_DEVICE = [ 
    { name : ATTR_ID_NAME, type : ATTR_ID_TYPE },
    { name : ATTR_NAME_NAME, type : ATTR_NAME_TYPE },
    { name : ATTR_DESCRIPTION_NAME, type : ATTR_DESCIPTION_TYPE },
    { name : ATTR_STATE_NAME, type : ATTR_STATE_TYPE },
    { name : ATTR_TYPE_NAME, type : ATTR_TYPE_TYPE }
]

const DEVICE_TYPE_TV = 0;
const DEVICE_TYPE_AC = 1;
const DEVICE_TYPE_LAMP = 2;
const DEVICE_TYPE_BLIND = 3;

const DEVICE_TYPE = [ DEVICE_TYPE_TV, DEVICE_TYPE_AC, DEVICE_TYPE_LAMP, DEVICE_TYPE_BLIND ]
    


// Funciones exportadas 
module.exports = {checkHdrAttribute, ATTR_DEVICE, ATTR_ID_NAME, ATTR_TYPE_NAME, checkDeviceType};

 /*-----------------------------------------------------------------*
 * checkHdrAttribute(header, k, v)						            *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *              k           Nombre del atributo buscado             *
 *              v           Valor esperado para el atributo         *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    Error si el atributo no existe o su valor es != a   *
 *              lo esperado.                                        *
 *																	*
 * Descripcion:														*
 *																	*
 * Verifica que el atributo exista en el header y su valor sea el   *
 * esperado.                                                        *
 *------------------------------------------------------------------*/
 function checkHdrAttribute(header, k, v) 
 {
     if(header[k] == undefined || header[k] != v) {
         msg = `Invalid header, missing or incorrect value for '${k}', it must be '${v}'`;
         logger(checkHdrAttribute.name, msg);
         return new Error(`Invalid body, error: ${msg}`);
     }
     return null;
 }

  /*-----------------------------------------------------------------*
 * checkDeviceType(type)						                    *
 *																	*
 * Entrada:		type        Tipo del dispositivo                    *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    true si el type es uno de los conocidos             *
 *																	*
 * Descripcion:														*
 *																	*
 * Verifica que el type sea uno de los conocidos.                   *
 *------------------------------------------------------------------*/
function checkDeviceType(type) 
{
    for (let i = 0; i < DEVICE_TYPE.length; i++) {
        if(type === DEVICE_TYPE[i]) {
            logger(checkDeviceType.name, `Device type=${type} is unkown`);
            return true;
        }
    }
    return false;
}