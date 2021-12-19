/*------------------------------------------------------------------*
 * delete-device.ts												    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa funciones de alto nivel para manipular las peticiones *
 * para eliminar informacion del remoto.                            *
 *------------------------------------------------------------------*/

 
 /*------------------------------------------------------------------*
  * deletetDevice(id, cbck)								             *
  *																	 *
  * Entrada:    id          Identificador del dispositivo a elimi-   *
  *                         nar.                                     *       
  *		        cbck        Funcion de callback que recibe el resul- *
  *                         tado de la peticion.                     *                    
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	No posee                                             *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Elimina del remoto un dispositivo.                               *
  *------------------------------------------------------------------*/
 
  function deletetDevice(id : number, cbck : DELETE_CALLBACK)
  {
      let url = `${BACKEND_URL}/devices/${id}`; 
      sendDELETE(url, cbck);
  }