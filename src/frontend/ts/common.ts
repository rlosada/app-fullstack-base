
/*------------------------------------------------------------------*
 * common.ts														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Definiciones comunes                                             *
 *------------------------------------------------------------------*/

 // Nombre de las divs que se utilizan para mostrar los diferentes elementos
 // involucrados
 const DIV_TITULO     = 'titulo';
 const DIV_PRIMARIA   = 'primaria';
 const DIV_SECUNDARIA = 'secundaria';
 const DIV_TERCIARIA  = 'terciaria';

 // Pagina principal
 const PAGE_TITLE = 'Smart Home Web Client';

 // Pagina-2
 // Identificadores asignados a los elementos del formulario (luego con esto se pueden recuperar)
const NEW_DEVICE_FORM_NAME_ID  = 'deviceName';
const NEW_DEVICE_FORM_DESC_ID  = 'deviceDesc';
const NEW_DEVICE_FORM_TYPE_ID  = 'deviceType';
const NEW_DEVICE_FORM_RANGE_ID = 'valueRange';
const NEW_DEVICE_VALUE_ID      = 'value';

// Eventos
const EVENT_ON_CLICK  = "onClick"
const EVENT_ON_CHANGE = "onChange"

const BACKEND_URL = 'http://192.168.0.2:8000';

// Definiciones de callbacks
type LIST_DEVICES_CALLBACK = (data : Device []) => void;
type ONCHANGE_CALLBACK     = (e : HTMLElement) => void;
type GET_CALLBACK          = (data : string) => void;         
type DELETE_CALLBACK       = (success : boolean) => void;
type CREATE_CALLBACK       = (data : string) => void;
type PATCH_CALLBACK        = (data : boolean) => void;


// Tipos de dispositivos
const DEVICE_TYPE_TV     = 0;
const DEVICE_TYPE_AC     = 1;
const DEVICE_TYPE_LAMP   = 2;
const DEVICE_TYPE_BLIND  = 3;

// Usado para validaciones de los largos de los campos de texto
const NAME_MAX_LEN = 32;   // usado para validar el nombre de dispositivo escogido
const NAME_MIN_LEN = 1;    // usado para validar el nombre de dispositivo escogido
const DESC_MAX_LEN = 128; // usado para validar el nombre de dispositivo escogido
const DESC_MIN_LEN = 1;   // usado para validar el nombre de dispositivo escogido

// Nombres de los iconos de materialiaze para aplicar en cada caso en la pagina-1
const DEVICE_ICON_TV    = 'tv';
const DEVICE_ICON_AC    = 'ac_unit';
const DEVICE_ICON_LAMP  = 'lightbulb_outline';
const DEVICE_ICON_BLIND = 'dehaze';

const DEVICE_TEXT_TV    = 'Televisor';
const DEVICE_TEXT_AC    = 'Aire Acondicionado';
const DEVICE_TEXT_LAMP  = 'Lampara';
const DEVICE_TEXT_BLIND = 'Cortina';

// Nombres de los botones
const BOTON_AGREGAR_NAME  = '+Agregar'; // Boton para agregar un nuevo dispositivo (pagina 1)
const BOTON_CREAR_NAME    = "Crear";    // Boton para solicitar la creacion de un nuevo dispositivo (pagina 2)
const BOTON_CANCELAR_NAME = "Cancelar"; // Boton para cancelar la edicion/creacion de un dispositivo (pagina 2)
const BOTON_APLICAR_NAME  = "Aplicar";  // Boton para aplicar los cambios sobre un dispositivo existente (pagina 2)

// Arreglos para extraer informacion de los tipos de dispositivos
const ONOF_TEMPLATES = 
[
    { 
        type : DEVICE_TYPE_TV, 
        icon : DEVICE_ICON_TV, 
        text : DEVICE_TEXT_TV,
        onStr : 'encendido',
        offStr : 'apagado'
        
    },
    {   
        type : DEVICE_TYPE_AC, 
        icon : DEVICE_ICON_AC, 
        text : DEVICE_TEXT_AC,
        onStr : 'encendido',
        offStr : 'apagado'
    },
    {   type : DEVICE_TYPE_LAMP, 
        icon : DEVICE_ICON_LAMP,
        text : DEVICE_TEXT_LAMP,
        onStr : 'encendido',
        offStr : 'apagado'
    }
];
const RANGE_TEMPLATES = 
[
    {   
        type : DEVICE_TYPE_BLIND, 
        icon : DEVICE_ICON_BLIND, 
        text : DEVICE_TEXT_BLIND,
        range : 1,
        min : 0,
        max : 100,
        minStr : 'abierta',
        maxStr : 'cerrada'
    }, 
]
const DEVICES_ICONS = 
[
    { 
        type : DEVICE_TYPE_TV, 
        icon : DEVICE_ICON_TV, 
        text : DEVICE_TEXT_TV,
    },
    {   
        type : DEVICE_TYPE_AC, 
        icon : DEVICE_ICON_AC, 
        text : DEVICE_TEXT_AC,
    },
    {   type : DEVICE_TYPE_LAMP, 
        icon : DEVICE_ICON_LAMP,
        text : DEVICE_TEXT_LAMP,
    },
    {   type : DEVICE_TYPE_BLIND, 
        icon : DEVICE_ICON_BLIND, 
        text : DEVICE_TEXT_BLIND,
    },
]




