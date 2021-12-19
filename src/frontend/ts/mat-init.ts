/*------------------------------------------------------------------*
 * mat-init.ts														                          *
 *																                                	*
 * Historico:	07/12/2021	Primer version						               	*
 *																	                                *
 * Inicializacion de materialize                                    *
 *------------------------------------------------------------------*/

 // Solo definido para que el ts compile
let M : any;

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
 
function materialize() 
{
    // Inicializacion general
    M.AutoInit();
    // Inicializacion especifica para lograr que el input tipo
    // range muestre el valor mientras se esta modificando
    var elems  = document.querySelectorAll("input[type=range]");
    M.Range.init(elems);
}