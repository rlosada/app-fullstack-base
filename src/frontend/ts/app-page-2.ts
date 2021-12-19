
/*------------------------------------------------------------------*
 * app-page-2.ts													*
 *																	*
 * Historico:	16/12/2021	Primer version							*
 *																	*
 * Funciones para generar la pagina secundaria la cual permite car- *
 * gar el formulario para crear un nuevo dispositivo o editar uno   *
 * existente.                                                       *
 *------------------------------------------------------------------*/

 // Como la pagina para crear un nuevo y editar un nuevo es la misma, solo que en
 // el segundo caso el formulario esta precargado con los valores del dispositivo 
 // elegido para editar se utilizan estas dos variables para poder determinar 
 // que hacer segun sea el caso
let editing : boolean = false; // true - Editando dispositivo; false - Creando dispositivo
let index : number ;           // Cuando se esta editando, aqui se almacena el indice del devArrayGlobal[] que contiene al dispositivo

//=======[ API ]==================================================

 /*------------------------------------------------------------------*
 * showAppPage2(i)								                    *
 *																	*
 * Entrada:		i           Indice del dispositivo en el arreglo    *
 *                          devArrayGlobal[]. (opcional)            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Muestra el formulario para agregar/editar un  dispositivo. El pa-*
 * rametro es opcional. Si no se indica significa que se desea crear*
 * un dispositivo de lo contrario editar uno existente.             *
 *------------------------------------------------------------------*/

 function showAppPage2(i ? : number)
 {
    let e = getElementById(DIV_PRIMARIA);
 
    // Limpiar la pagina
    cleanPage();

    // Agregar titutlo
    if(addTitle() === false) 
        return false;

    // Cargar contenido en funcion de si se esta creando o editando un dispositivo 
    if(i === undefined) {
        logger(showAppPage2.name, `Loading Page2 - Create new device`);
        e.innerHTML += buildTextBox(NEW_DEVICE_FORM_NAME_ID, 'Nombre del dispositivo');
        e.innerHTML += buildTextBox(NEW_DEVICE_FORM_DESC_ID, 'Descripcion del dispositivo');
        e.innerHTML += buildSelectType(NEW_DEVICE_FORM_TYPE_ID, EVENT_ON_CHANGE, updateAddDeviceForm);
        editing = false; 
    }
    else {
        let d : Device = devArrayGlobal[i];
        logger(showAppPage2.name, `Loading Page2 - Update device with index=${i}. Device: ${d.toJson()}`);
        e.innerHTML += buildTextBox(NEW_DEVICE_FORM_NAME_ID, 'Nombre del dispositivo', d.name);
        e.innerHTML += buildTextBox(NEW_DEVICE_FORM_DESC_ID, 'Descripcion del dispositivo', d.description);
        e.innerHTML += buildSelectType(NEW_DEVICE_FORM_TYPE_ID, EVENT_ON_CHANGE, updateAddDeviceForm, d.type);
        _updateAddDeviceForm(d.type, d.state);
        editing = true;
        index = i;
    }
 
     // Incluir los botones para confirmar o cancelar la creacion
     addNewDeviceFormButtons();

     // Volver a correr inicializacion de materialize
     materialize();
 }

//=======[ Internal ]==================================================

 /*------------------------------------------------------------------*
 * addNewDeviceFormButtons()									    *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Agrega a la aplicacion los botones para :                        *
 * - solicitar al backend la creacion/edicion de un dispositivo     *
 * - cancelar y volver a la pantalla donde se listan los dispositi- *
 *   existentes hasta el momento.                                   *
 *------------------------------------------------------------------*/

  function addNewDeviceFormButtons()
 {
    let f = addNewDeviceFormButtons.name;
    let divs : string[] = []; 
    let buttonName : string;
    let buttonStr : string;
    let buttonDivStr : string;

    const FUNC_CONFIRM_CREATION = 'confirmRequest()';        // Nombre de la funcion ejecutada cuando el usuario decide enviar la solicitud de creacion de un nuevo dispositivo
    const FUNC_CANCEL_CREATION  = 'cancelDeviceCreation()';  // Nombre de la funcion ejecutada cuando el usuario decide cancelar la creacion de un nuevo dispositivo

    // Recuperar elemento HTML a modificar
    let e = getElementById(DIV_TERCIARIA);
    if(e === null) {
        logger(f, `Fail to get element with id=${DIV_TERCIARIA}`)
        return false;
    }
    e.innerHTML = '';
    
    // Crear boton para confirmar creacion de un dispositivo
    buttonName = (editing === false ? BOTON_CREAR_NAME : BOTON_APLICAR_NAME);
    buttonStr  = buildButton(buttonName, EVENT_ON_CLICK, FUNC_CONFIRM_CREATION)
    if(buttonStr === null) {
        logger(f, `Fail to built button with id=${buttonName}`)
        return false;
    }
    buttonDivStr = buildDiv(buttonStr, 6, 6, 6, 6);
    if(buttonDivStr === null) {
        logger(f, `Fail to built div for button with id=${buttonName}`)
        return false;      
    }
    divs.push(buttonDivStr);

    // Boton para cancelar creacion de nuevo dispositivo
    buttonName = BOTON_CANCELAR_NAME;
    buttonStr  = buildButton(buttonName, EVENT_ON_CLICK, FUNC_CANCEL_CREATION)
    if(buttonStr === null) {
        logger(f, `Fail to built button with id=${buttonName}`)
        return false;
    }
    buttonDivStr = buildDiv(buttonStr, 6, 6, 6, 6);
    if(buttonDivStr === null) {
        logger(f, `Fail to built div for button with id=${buttonName}`)
        return false;      
    }
    divs.push(buttonDivStr);
    
    // Agregarlo al HTML
    e.innerHTML += buildRow(divs);

    return true;
 }

 
 /*------------------------------------------------------------------*
 * updateAddDeviceForm(obj)									        *
 *																	*
 * Entrada:		obj        Elemento HTML que ejecuto la funcion     *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Funcion ejecutada cuando el usuario seleciona una opcion de la   *
 * lista de tipos de dispositivos. Aqui se analiza que opcion se    *
 * eligio y se dibuja el tipo de control adecuado segun el tipo de  *
 * dispositivo.                                                     *
 *------------------------------------------------------------------*/
 function updateAddDeviceForm(obj : HTMLElement) 
 {
    let f : string = updateAddDeviceForm.name;;
    let type : number;   

    // Verificar que el objeto es valido y recuperar su 'value' el cual
    // se considera el 'type' del dispositivo
    if(obj === undefined || obj === null) {
        logger(f, `Received object is undefined or null, fail to continue`);  
        return;
    }

    type = Number.parseInt(<string> (<HTMLInputElement>obj).value);

    logger(f, `Received object type ${typeof obj}. Value for device type selected by user  is ${type}`);

    _updateAddDeviceForm(type);
 } 
 
 /*------------------------------------------------------------------*
 * _updateAddDeviceForm(type, value)  						        *
 *																	*
 * Entrada:		type       Tipo de dispositivo                      *
 *              value      Valor a asignar (opcional)               *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Agrega a la pantalla los elementos para seleccionar el valor se- *
 * gun sea el tipo. Si se recibe un valor este es usado para inicia-*
 * lizar el valor mostrado.                                         *
 *------------------------------------------------------------------*/

function _updateAddDeviceForm(type : number, value ? : number)
{
    let f : string = _updateAddDeviceForm.name;
    let e : HTMLElement; 
    
    logger(f, `Value for device type selected by user  is ${type}`);

    // Recuperar elemento HTML a modificar
    e = getElementById(DIV_SECUNDARIA);
    if(e === null) {
        logger(f, `Fail to get element with id=${DIV_SECUNDARIA}`);  
        return;
    }

    // Guardar el nuevo valor elegido para el 'type' para luego poder
    // ser recuperado al momento de crear el dispositivo
    let tmp = getElementById(NEW_DEVICE_FORM_TYPE_ID);
    if(tmp === null) {
        logger(f, `Fail to get element with id=${NEW_DEVICE_FORM_TYPE_ID}`);  
        return;       
    }
    let tmpInput = (<HTMLInputElement>tmp);
    tmpInput.value = type.toString();

    // Agregar el contro segun sea el 'type'
    for(let i = 0 ; i < ONOF_TEMPLATES.length; i++) {
        if(type === ONOF_TEMPLATES[i].type) {
            let b = ONOF_TEMPLATES[i];
            e.innerHTML = buildSwitchInput(b.text, b.onStr, b.offStr, ((value === undefined || value == 0) ? false : true)) ;
            materialize();
            logger(f, `Adding onOff button`);
            return;
        }
    }
    for(let i = 0 ; i < RANGE_TEMPLATES.length; i++) {
        if(type === RANGE_TEMPLATES[i].type) {
            let b = RANGE_TEMPLATES[i];
            e.innerHTML = buildRangeInput(b.text, b.min, b.max, b.minStr, b.maxStr);
            materialize();
            logger(f, `Adding range button`);
            return;
        }
    }    
    logger(f, `Nothing to be done`);
    return;
}

 /*------------------------------------------------------------------*
 * confirmRequest()									                *
 *																	*
 * Entrada:		No posee                                            *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Funcion que envia la peticion para crear o actualizar un dispo-  *
 * sitivo.                                                          *
 *------------------------------------------------------------------*/

function confirmRequest()
{
   let name, desc : string;
   let type : number;
   let e : HTMLElement;
   let f = confirmRequest.name;
   logger(f, `creation/editing of new device requested by user`);


   // ------------------------------
   // Recuperar los datos ingresados
   // ------------------------------

   // Recuperar nombre
    e = getElementById(NEW_DEVICE_FORM_NAME_ID);
    if(e === undefined) {
        logger(f, `Fail to get element with id=${NEW_DEVICE_FORM_NAME_ID}`);
        showAppPage1();
        return;
    }
    name = (<HTMLInputElement>e).value
    if(name.length < NAME_MIN_LEN || name.length > NAME_MAX_LEN) {
        e = getElementById(`${NEW_DEVICE_FORM_NAME_ID}Label`);
        if(e === undefined) {
            return;
        }
        return;
    } 

    // Recuperar descripcion
    e = getElementById(NEW_DEVICE_FORM_DESC_ID);
    if(e === undefined) {
        showAppPage1();
        return;
    }
    desc = (<HTMLInputElement>e).value 
    if(desc.length < DESC_MIN_LEN || desc.length > DESC_MAX_LEN) {
        e = getElementById(`${NEW_DEVICE_FORM_DESC_ID}Label`);
        if(e === undefined) {
            return;
        }
        return;
    }       

    // Recuperar type
    e = getElementById(NEW_DEVICE_FORM_TYPE_ID);
    if(e === undefined) {
        showAppPage1();
        return;
    }
    type = Number.parseInt((<HTMLInputElement>e).value); 

    // Recuperar el valor seleccionado
    let rc : [boolean, number] = getValue(type);
    if(rc[0] === false) {
        showAppPage1();
    }
   
    // ------------------------------
    // Solicitar al backend la creacion 
    // o edicion del dispositivo y luego 
    // ir a la pagina 1
    // ------------------------------
    // Si se estaba editando solicitar la actualizacion y sino la creacion
    if(editing === true) {
        let deviceid = devArrayGlobal[index].id;
        let device = Device.buildFromObj({ id : deviceid, name : name, description : desc, state : rc[1], type : type});
        logger(f, `Requesting update of device : { id : ${deviceid},  name : ${name}, description : ${desc}, type : ${type}, value : ${rc[1]}}`);
        updateDevice(device, (rc) => {
            if(rc === false) {
                let msg  = `Update of device : { name : ${name}, description : ${desc}, type : ${type}, value : ${rc[1]}} failed`;
                logger(f, msg);
            }
            showAppPage1();           
        })
    } else {
        logger(f, `Requesting creation of new device : { name : ${name}, description : ${desc}, type : ${type}, value : ${rc[1]}}`);
        let device = Device.buildNew(name, desc, rc[1], type);
        createDevice(device, (str) => {
            if(str === null) {
                let msg  = `Creation of device : { name : ${name}, description : ${desc}, type : ${type}, value : ${rc[1]}} failed`;
                logger(f, msg);
            }
            showAppPage1();
        })
    }
   return;
}


 /*------------------------------------------------------------------*
 * cancelDeviceCreation()									        *
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

 function cancelDeviceCreation()
 {
    let f = cancelDeviceCreation.name;
    logger(f, `creation of new device canceled by user`);
    showAppPage1();
    return;
 }
 

 /*------------------------------------------------------------------*
 * getValue(type)									                *
 *																	*
 * Entrada:		type        Tipo de dispositivo del cual recuperar  *
 *                          el valor.                               *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    Tupla [boolean, number]                             *
 *																	*
 * Descripcion:														*
 *																	*
 * A partir del tipo de dispositivo intenta recuperar el valor in-  *
 * gresado por el usuario. Si se puede devuelve [true, valor] y si  *
 * no [false, -1].                                                  *
 *------------------------------------------------------------------*/

function getValue(type : number) : [boolean, number]
{
    let value : string;
    let e : HTMLElement;

    // En este caso los inputs son de type RANGE 
    for(let i = 0 ; i < RANGE_TEMPLATES.length; i++) {
        if(type === RANGE_TEMPLATES[i].type) {
            e = getElementById(RANGE_TEMPLATES[i].text);
            if(e === null) {
               return [false, -1]
            }
            value = (<HTMLInputElement>e).value 
            return [true, Number.parseInt(value)];
        }
    }
    // En este caso los inputs son de type CHECKBOX
    for(let i = 0 ; i < ONOF_TEMPLATES.length; i++) {
        if(type === ONOF_TEMPLATES[i].type) {
            e = getElementById(ONOF_TEMPLATES[i].text);
            if(e === undefined) {
               return [false, -1]
            }
            return [true,  ((<HTMLInputElement>e).checked ? 1 : 0)];
        }
    }
    logger(getValue.name, `Fail to get value selected by user for type=${type}`);
    return [false, -1];
}


