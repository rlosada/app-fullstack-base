/*------------------------------------------------------------------*
 * create-device.ts												    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa funciones de alto nivel para manipular las peticiones *
 * para crear informacion del remoto.                               *
 *------------------------------------------------------------------*/

 
 /*------------------------------------------------------------------*
  * createDevice(dev, cbck)							                 *
  *																	 *
  * Entrada:     dev         Dispositivo a crear                     *
  * 		        cbck     Funcion de callback a enviar el resul-  *
  *                          tado.                                   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Crea un nuevo dispositivo en el remoto.                          *
  *------------------------------------------------------------------*/
 
  function createDevice(dev : Device, cbck : CREATE_CALLBACK)
  {
      let url = `${BACKEND_URL}/devices/`; 
      sendPOST(url, dev.toJson(), cbck);
  }
 