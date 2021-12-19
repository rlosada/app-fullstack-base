/*------------------------------------------------------------------*
 * logger.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa logger                                                *
 *------------------------------------------------------------------*/

 // Funciones exportadas 
 module.exports = logger;

 /*------------------------------------------------------------------*
 * logger(f, msg)									                *
 *																	*
 * Entrada:		f           Nombre de la funcion                    *
 *              msg         Mensaje                                 *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Imprime un mensaje en la consola utilizando un formateo especial *
 *------------------------------------------------------------------*/

function logger(f, msg)
{
    let max_size = 50;
    let m = `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} | ${f}`
    let n = m.length;
    for(let i = 0; i < max_size - n; i++) 
        m = `${m} `;
    m = `${m} | ${msg}`;
    console.log(m);
}

