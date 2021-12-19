
/*------------------------------------------------------------------*
 * get-device.ts												    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa funciones de alto nivel para manipular las peticiones *
 * para recuperar informacion del remoto.                           *
 *------------------------------------------------------------------*/

 /*------------------------------------------------------------------*
 * getAllDevices(cbck)								                *
 *																	*
 * Entrada:		cbck        Funcion de callback encargada de mos-   *
 *                          trar en la pantalla el arreglo de dis-  *
 *                          positivos recuperado.                   *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera del remoto el arreglo de dispositivos                   *
 *------------------------------------------------------------------*/

 function getAllDevices(cbck : LIST_DEVICES_CALLBACK)
 {
     let url                 = `${BACKEND_URL}/devices`  
     sendGET(url, (json : string) =>
     {
         processGetResponse(json, cbck);
         }
     );
 }
 
 /*------------------------------------------------------------------*
  * getAllDevices(id, cbck)								             *
  *																	 *
  * Entrada:     id          Identificador del dispositivo a recupe- *
  *                          rar.                                    *       
  * 		        cbck        Funcion de callback encargada de mos-*
  *                          trar en la pantalla el arreglo de dis-  *
  *                          positivos recuperado.                   *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	    No posee                                         *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Recupera del remoto el arreglo de dispositivos                   *
  *------------------------------------------------------------------*/
 
  function getDevice(id : number, cbck : LIST_DEVICES_CALLBACK)
  {
      let url = `${BACKEND_URL}/devices/${id}`; 
      sendGET(url, (json : string) =>
      {
          processGetResponse(json, cbck);
          }
      );
  }
 
 /*------------------------------------------------------------------*
  * processGetResponse(json, cbck)								     *
  *																	 *
  * Entrada:     json        Json devuelto por el remoto             *       
  * 		        cbck        Funcion de callback encargada de mos-*
  *                          trar en la pantalla el arreglo de dis-  *
  *                          positivos recuperado.                   *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	    No posee                                         *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Procesa la respuesta del remoto.                                 *
  *------------------------------------------------------------------*/
 
 function processGetResponse(json : string, cbck : LIST_DEVICES_CALLBACK)
 {
     let f                   = processGetResponse.name;
     let devArray : Device[] = [];
 
     logger(f, `Raw data received from remote: ${json}`);
 
     // Intentar convertir lo recibido en un arreglo de objetos
     let objArray : any[];
     try {
         objArray = JSON.parse(json);
     }
     catch(e) {
         logger(f, `Data received from remote is not a valid json string`);
         return cbck([]/* Arreglo vacio */);
     }
     // Intentar convertir el arreglo de objetos a un arreglo de Device
     for(let i = 0; i < objArray.length; i++) {
         let d = Device.buildFromObj(objArray[i]);
         if(d === null) {
             logger(f, `Fail to convert object into a Device`);
             return cbck([]/* Arreglo vacio */);
         }
         devArray.push(d);
     }
     logger(f, `${devArray.length} devices recovered from remote`);
     // Mostrar en pantalla
     cbck(devArray);
 }
 
 