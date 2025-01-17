/*------------------------------------------------------------------*
 * main.ts														    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Entry point de la aplicacion                                     *
 *------------------------------------------------------------------*/

 /*------------------------------------------------------------------*
 * init()									                        *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Inicializacion de la aplicacion front                            *
 *------------------------------------------------------------------*/

function init()
{
    let f = init.name;
    let n = '';

    logger(init.name, 'Application initialization started');

    materialize();

    return showAppPage1();
   
}

// Cuando se termina de cargar los archivos se ejecuta esta funcion
window.onload = () => 
{
   init();
}

