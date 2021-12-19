/*------------------------------------------------------------------*
 * mat-init.js  													                          *
 *																	                                *
 * Historico:	07/12/2021	Primer version							              *
 *																	                                *
 * Este es el archivo que luego se usa en el index.html ignorando   *
 * el generado por el compilador tsc.                               *
 *------------------------------------------------------------------*/

 /*------------------------------------------------------------------*
  * materialize()							                                       *
  *																	                                 *
  * Entrada:   No posee                                              *
  *																	                                 *
  * Salida:		 No posee                                              *
  *																	                                 *
  * Retorno:	 No posee                                              *
  *																	                                 *
  * Descripcion:													                           *
  *																	                                 *
  * Inicializa el materialize                                        *
  *------------------------------------------------------------------*/
function materialize() {
    M.AutoInit();
    var elems  = document.querySelectorAll("input[type=range]");
    M.Range.init(elems);
}
