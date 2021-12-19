/*------------------------------------------------------------------*
 * update-device.ts												    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa funciones de alto nivel para manipular las peticiones *
 * para crear informacion del remoto.                               *
 *------------------------------------------------------------------*/

 
 /*------------------------------------------------------------------*
  * updateDevice(dev, cbck)							                 *
  *																	 *
  * Entrada:     dev         Dispositivo a crear                     *
  * 		     cbck        Funcion de callback a enviar el resul-  *
  *                          tado.                                   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Actualiza un nuevo dispositivo en el remoto.                     *
  *------------------------------------------------------------------*/
 
  function updateDevice(dev : Device, cbck : PATCH_CALLBACK)
  {
      // TODO : Aqui en realidad se envia todo el dispositivo con lo cual
      //        todos los valores van a hacer el UPDATE, los cambiados y los
      //        que no. 
      //        Seria mejor solo enviar el delta del dispositivo que solo in-
      //        cluya los valores que efectivamente son diferentes.
      let url = `${BACKEND_URL}/devices/${dev.id}`; 
      sendPATCH(url, dev.toJson(), cbck);
  }
 