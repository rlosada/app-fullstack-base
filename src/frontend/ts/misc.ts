/*------------------------------------------------------------------*
 * misc.js														    *
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Agruga funciones miscelaneas                                     *
 *------------------------------------------------------------------*/

let devArrayGlobal : Device[] = []; // Arreglo que mantiene la lista de dispositivos actuales


 /*------------------------------------------------------------------*
  * updateDeviceList(deviceArrayBe)								     *
  *																	 *
  * Entrada:     deviceArraydB Arreglo de dispositivos recuperados   *
  *                            del backend                           * 
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	No posee                                             *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Actualiza el arreglo de dispositivos local para matchear el de-  *
  * vuelto por el backend.                                           *
  *------------------------------------------------------------------*/

function updateDeviceList(deviceArrayBe : Device[])
{
    logger(updateDeviceList.name, 'Updating local device list');
    devArrayGlobal = [];
    deviceArrayBe.forEach(d => 
        {
            devArrayGlobal.push(d);
            logger(updateDeviceList.name, d.toJson());
        });
}

 /*------------------------------------------------------------------*
  * updateDeviceList(type)								             *
  *																	 *
  * Entrada:    type           Tipo de dispostivo                    *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Nombre del icono de materialize utilizado para re-   *
  *             presentar al dispositivo.                            *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Convierte el tipo de dispositivo en el nombre de un icono.       *
  *------------------------------------------------------------------*/

function getIcon(type : number) 
{
    for(let i = 0; i < DEVICES_ICONS.length; i++) {
        if(type === DEVICES_ICONS[i].type) 
            return DEVICES_ICONS[i].icon;
    }
    // Devuelve este nombre de icono si no existe match. Esto
    // no deberia suceder nunca.
    return 'block';
}

 /*------------------------------------------------------------------*
  * getElementById(id)								                 *
  *																	 *
  * Entrada:    id           Identificador del elemento HTML         *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Elemento HTML con el id especificado                 *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Recupera del DOM el elemento HTML cuyo id es es especificado     *
  *------------------------------------------------------------------*/

function getElementById(id :string)
{
    let f = getElementById.name;
    let e = document.getElementById(id);
    if(e === undefined) {
        logger(f, `Fail to get button with id=${id}`);
        return null;   
    }  
    return e;
}


 /*------------------------------------------------------------------*
  * cleanPage()								                         *
  *																	 *
  * Entrada:    No posee                                             *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	No posee                                             *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Limpia la pagina                                                 *
  *------------------------------------------------------------------*/

function cleanPage()
{
    let e : HTMLElement;

    e = getElementById(DIV_TITULO);
    if(e) {
        e.innerHTML = '';
    }
    e = getElementById(DIV_PRIMARIA);
    if(e) {
        e.innerHTML = '';
    }
    e = getElementById(DIV_SECUNDARIA);
    if(e) {
        e.innerHTML = '';
    }
    e = getElementById(DIV_TERCIARIA);
    if(e) {
        e.innerHTML = '';
    }         
}