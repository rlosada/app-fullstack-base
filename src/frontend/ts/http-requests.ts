/*------------------------------------------------------------------*
 * get.js															*
 *																	*
 * Historico:	11/12/2021	Primer version							*
 *																	*
 * Implementa la comunicacion del Front al Back mediante GET        *
 *------------------------------------------------------------------*/


 
 /*------------------------------------------------------------------*
  * sendGET(url, cbck)			                                     *
  *																	 *
  * Entrada:	 url         Ruta destino del GET                    *
  *              cbck        Funcion a ejecutar con los resultados   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Realiza un GET a la ruta especificada y lo devuelto por el remoto*
  * es pasado como argumento a la funcion cbck.                      *
  *------------------------------------------------------------------*/
 
  function sendGET(url : string , cbck : GET_CALLBACK) 
  {
     let req = new XMLHttpRequest();
     req.open('GET', url);
     req.onreadystatechange = () =>
     {
         if(req.readyState == 4) {
             if(req.status == 200)
                 cbck(req.responseText)
             else
                 cbck(null);
         }
     }
     req.send();
  }
 
   /*----------------------------------------------------------------*
  * sendDELETE(url, cbck)			                                 *
  *																	 *
  * Entrada:	 url         Ruta destino del GET                    *
  *              cbck        Funcion a ejecutar con los resultados   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Realiza un DELETE a la ruta especificada y lo devuelto por el    *
  * remoto es pasado como argumento a la funcion cbck.               *
  *------------------------------------------------------------------*/
 
  function sendDELETE(url : string , cbck : DELETE_CALLBACK) 
  {
     let req = new XMLHttpRequest();
     req.open('DELETE', url);
     req.onreadystatechange = () =>
     {
         if(req.readyState == 4) {
             if(req.status == 200)
                 cbck(true)
             else
                 cbck(false);
         }
     }
     req.send();
  }
 
 
 /*------------------------------------------------------------------*
  * sendPOST(url, json, cbck)			                             *
  *																	 *
  * Entrada:	 url         Ruta destino del GET                    *
  *              json        String en formato json a incluir en el  *
  *                          body.                                   *
  *              cbck        Funcion a ejecutar con los resultados   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Realiza un DELETE a la ruta especificada y lo devuelto por el    *
  * remoto es pasado como argumento a la funcion cbck.               *
  *------------------------------------------------------------------*/
 
  function sendPOST(url : string , json : string, cbck : CREATE_CALLBACK) 
  {
     let req = new XMLHttpRequest();
     req.open('POST', url);
     req.onreadystatechange = () =>
     {
         if(req.readyState == 4) {
             if(req.status == 200)
                 cbck(req.responseText)
             else
                 cbck(null);
         }
     }
     req.setRequestHeader('content-type', 'application/json');
     req.send(json);
  }
 
  
 /*------------------------------------------------------------------*
  * sendPATCH(url, json, cbck)			                             *
  *																	 *
  * Entrada:	 url         Ruta destino del GET                    *
  *              json        String en formato json a incluir en el  *
  *                          body.                                   *
  *              cbck        Funcion a ejecutar con los resultados   *
  *																	 *
  * Salida:		 No posee                                            *
  *																	 *
  * Retorno:	 No posee                                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Realiza un PATCH a la ruta especificada y lo devuelto por el     *
  * remoto es pasado como argumento a la funcion cbck.               *
  *------------------------------------------------------------------*/
 
  function sendPATCH(url : string , json : string, cbck : PATCH_CALLBACK) 
  {
     let req = new XMLHttpRequest();
     req.open('PATCH', url);
     req.onreadystatechange = () =>
     {
         if(req.readyState == 4) {
             if(req.status == 200)
                 cbck(true)
             else
                 cbck(false);
         }
     }
     req.setRequestHeader('content-type', 'application/json');
     req.send(json);
  }
 