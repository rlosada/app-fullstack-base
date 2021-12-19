
/*------------------------------------------------------------------*
 * app-page-1.ts													*
 *																	*
 * Historico:	16/12/2021	Primer version							*
 *																	*
 * Funciones para generar la pagina principal la cual presenta una  *
 * lista de los dispositivos devueltos por el backend.              *
 *------------------------------------------------------------------*/

//=======[ API ]==================================================

 /*-----------------------------------------------------------------*
 * showAppPage1()								                    *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Muestra la pagina-1                                              *
 *------------------------------------------------------------------*/

function showAppPage1()
{
    // Dibjua la pagina principal
    //
    // |----------------------------------------------- 
    // |      titulo                                  |
    // |----------------------------------------------- 
    // |    lista de dispositivos    ELIMINAR  EDITAR | 
    // |    actuales                                  |  
    // |----------------------------------------------- 
    // |  boton p/agregar nuevo                       |
    // |-----------------------------------------------
    logger(showAppPage1.name, `Loading Page1`);

    // Limpiar la pagina
    cleanPage();

    // Agregar titutlo
    if(addTitle() === false) 
        return false;

    // Recupera y dibuja lista de dispositivos
    addDeviceList();

    // Agregar boton que permite agregar dispositivos
    if(addCreateNewDeviceButton() === false)
        return false; 

    return true;
}

//=======[ Internal ]==================================================

 /*------------------------------------------------------------------*
 * addTitle()								                        *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Agrega el titulo a la pagina-1                                   *
 *------------------------------------------------------------------*/

function addTitle()
{
    let f = addTitle.name;

    // Recuperar elemento HTML a modificar
    let e = getElementById(DIV_TITULO);
    if(e === null) {
        logger(f, `Fail to get element with id=${DIV_TITULO}`)
        return false;
    }
    // Fabricar nuevo elemento HTML (como un string)
    let t = buildTitle(PAGE_TITLE);
    if(t === null) {
        logger(f, `Fail to built title element`);
        return false;
    }
    // Agregarlo al HTML
    e.innerHTML = t;
    return true;
}

 /*------------------------------------------------------------------*
 * addDeviceList()								                    *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Busca en el backend la lista de dispositivos actuales, actualiza *
 * la lista local y luego dibuja en la pagina-1 la lista actualiza- *
 * da.                                                              *
 *------------------------------------------------------------------*/

function addDeviceList()
{
    // deviceArraydB es el arreglo que getAllDevices() fabrica y le pasa a esta f de callback
    getAllDevices((deviceArraydB : Device[]) => 
        {
            // Si falla la recuperacion de los dispositivos desde la dB mostrar
            // una alerta al usuario para que conozca la situacion
            if(deviceArraydB === undefined || deviceArraydB === undefined) {
                alert('Fail to load devices from dB');
                return;
            }
            // Actualiza la lista global de dispositivos
            updateDeviceList(deviceArraydB);
            // Re-dibuja la tabla de dispositivos en la pagina
            drawDevices();
        } 
    )
    return;
}


 /*------------------------------------------------------------------*
 * addCreateNewDeviceButton()								        *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Agrega el boton que permite crear un nuevo dispositivo (lo que   *
 * implica mostrar la pagina-2)                                     *
 *------------------------------------------------------------------*/

function addCreateNewDeviceButton()
{
   let f = addCreateNewDeviceButton.name;
   const FUNC_ADD_DEVICE = 'userClickAdd()'; // Funcion a ejecutar cuando se haga click en el boton que se esta creando

   // Recuperar elemento HTML a modificar
   let e = getElementById(DIV_TERCIARIA);
   if(e === null) {
       logger(f, `Fail to get element with id=${DIV_TERCIARIA}`)
       return false;
   }
   // Fabricar nuevo elemento HTML (como un string)
   let b = buildButton(BOTON_AGREGAR_NAME, EVENT_ON_CLICK, FUNC_ADD_DEVICE)
   if(b === undefined || b === null) {
       logger(f, `Fail to built button with id=${BOTON_AGREGAR_NAME}`)
       return false;
   }
   let d = buildDiv(b, 12, 12, 12, 12);
   if(d === null) {
       logger(f, `Fail to built div for button with id=${BOTON_AGREGAR_NAME}`)
       return false;      
   }
   // Agregarlo al HTML
   e.innerHTML = buildRow([d]);
  return true;
}

/*------------------------------------------------------------------*
 * drawDevices()								                    *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Agrega a la pagina-1 la lista de dispositivos                    *
 *------------------------------------------------------------------*/

function drawDevices()
{
    let f = drawDevices.name;

    // Recuperar elemento HTML a modificar
    let e = getElementById(DIV_PRIMARIA);
    if(e === undefined) 
        return;   
    e.innerHTML = '';

    // Recorrer el arreglo de dispositivos e ir añadiendolos al elemento HTML
    devArrayGlobal.forEach( (d, i) => 
        {
            e.innerHTML += buildItemFromDevice(i);;
        }
    )
}


